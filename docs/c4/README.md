# C4 架构图

> 建模约定：Context 讲「谁用系统」，Container 讲「系统由哪些可部署单元组成」，Component 在 P1 后按领域上下文补齐。

## L1 · System Context

```mermaid
flowchart LR
  Admin[管理员 / 销售]
  Viewer[面试官 / 客户]
  Web[erp-admin<br/>Web 管理端]
  Desk[desktop<br/>作品集工作台]
  Api[ERP 平台<br/>erp-api]
  Store[(PostgreSQL)]
  Cache[(Redis)]
  Pay[Mock 支付适配器]

  Admin --> Web
  Viewer --> Desk
  Web --> Api
  Desk -->|live 模式| Api
  Desk -->|demo 模式| Local[(本地 SQLite)]
  Api --> Store
  Api --> Cache
  Api --> Pay
```

**外部依赖为零**：所有外部服务在生产由适配器替换，演示时全部走本地实现。

## L2 · Container

```mermaid
flowchart TB
  subgraph apps["apps/（可运行应用）"]
    Web["erp-admin<br/>Vue3 + Vite<br/>renderer"]
    Api["erp-api<br/>NestJS<br/>interface / application / domain / infrastructure"]
    Desk["desktop<br/>Electron<br/>main / preload / renderer"]
  end

  subgraph packages["packages/（共享内核）"]
    Contracts["contracts<br/>Zod schema + 类型"]
    UI["ui<br/>组件与主题"]
    Config["config<br/>环境变量校验"]
    Domain["domain-kit<br/>值对象 / 状态机"]
  end

  Web --> Contracts
  Web --> UI
  Desk --> Contracts
  Desk --> UI
  Api --> Contracts
  Api --> Domain
  Api --> Config
  UI --> Contracts
  Config --> Contracts
  Domain --> Contracts

  Api --> PG[(PostgreSQL)]
  Api --> RD[(Redis)]
  Desk -.->|demo| Lite[(SQLite)]
```

## 依赖方向 🔴

`apps → packages` 单向。`packages` 之间只允许 `ui / config / domain-kit → contracts`；**禁止** `contracts` 依赖任何其他包；**禁止** apps 之间互相 import。完整矩阵见 [`../design/README.md`](../design/README.md)。

## 变化点

| 变化 | 需更新的图 |
|---|---|
| 新增一个端（移动 / 第三方） | L1 + L2 |
| 新增限界上下文 | L2 Component（P1 补） |
| 替换数据库或支付通道 | L2 基础设施连线 |
