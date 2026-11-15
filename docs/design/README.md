# 目录结构与依赖矩阵

## 目录

```
ERP_Project/
├── README.md                     门面
├── 架构总纲.md                   唯一入口
├── CONTRIBUTING.md               工程规范
├── THIRD-PARTY-NOTICES.md        第三方许可声明
├── package.json                  根脚本与门禁
├── pnpm-workspace.yaml           workspace 定义
├── tsconfig.base.json            共享编译配置
├── docker-compose.yml            Postgres + Redis
├── .env.example                  开发默认值（无真实凭据）
├── scripts/
│   └── cleanup-template.cjs      上游模板清理（可复现）
├── apps/
│   ├── erp-admin/                ✅ 已落地（v3-admin-vite 起点）
│   ├── erp-api/                  ✅ 已落地（NestJS 四层）
│   └── desktop/                  ✅ 已落地（Electron 双模式）
├── packages/
│   ├── contracts/                ✅ 已落地（Zod 单一真源）
│   ├── ui/                       ✅ 主题 CSS 变量（admin 引用）
│   ├── config/                   ✅ Zod 环境变量校验（erp-api 引用）
│   └── domain-kit/               ✅ 金额值对象 / 状态机 / 领域事件（erp-api 引用）
└── docs/
    ├── adr/  c4/  domain/        决策 / 架构图 / 领域
    ├── contracts/  design/       契约 / 依赖矩阵
    └── runbooks/  showcase/      运行 / 演示
```

## 依赖矩阵

行 = 依赖方，列 = 被依赖方。✅ 允许，❌ 禁止，— 无需。

| 依赖方 \ 被依赖方 | contracts | ui | config | domain-kit | erp-api | erp-admin | desktop |
|---|---|---|---|---|---|---|---|
| `packages/contracts` | — | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `packages/ui` | ✅ | — | ❌ | ❌ | ❌ | ❌ | ❌ |
| `packages/config` | ✅ | ❌ | — | ❌ | ❌ | ❌ | ❌ |
| `packages/domain-kit` | ✅ | ❌ | ❌ | — | ❌ | ❌ | ❌ |
| `apps/erp-api` | ✅ | ❌ | ✅ | ✅ | — | ❌ | ❌ |
| `apps/erp-admin` | ✅ | ✅ | ❌ | ❌ | ❌ | — | ❌ |
| `apps/desktop` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | — |

## 禁止的反向边 🔴

1. `packages/* → apps/*`（共享内核不得感知具体应用）
2. `apps/* → apps/*`（应用间只能通过 API 通信）
3. `contracts → 任何其他包`（契约必须是依赖图终点）
4. `domain → infrastructure / interface`（四层单向依赖，见 `架构总纲.md` 第 4 节）

> CI 在 P1 接入静态扫描；当前由 `pnpm -r typecheck` + 人工评审保证。
