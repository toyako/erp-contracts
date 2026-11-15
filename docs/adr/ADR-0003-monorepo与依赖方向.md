# ADR-0003 · monorepo 与依赖方向

- **状态**：`accepted`（按上轮推荐默认值推进，可随时 supersede）
- **日期**：2026-11-14
- **相关**：[`../../架构总纲.md`](../../架构总纲.md) 第 4、5 节

## 背景

三端（`erp-api` / `erp-admin` / `desktop`）需共享契约、UI 与配置；若拆成多仓库，类型同步、版本对齐与本地演示都会额外增加成本。同时必须防止共享包反向依赖具体应用，导致架构腐化。

## 决策

采用 **pnpm workspace**：`apps/*` 放可运行应用，`packages/*` 放共享内核。

| 规则 | 内容 |
|---|---|
| 依赖方向 | `apps → packages` 单向；**禁止** `packages → apps`、**禁止** apps 之间互相 import |
| 根脚本 | `pnpm -r` 统一驱动 lint / typecheck / test / build，门禁为 `pnpm check` |
| 共享包职责 | `contracts`（纯类型）、`ui`（组件与主题）、`config`（环境校验）、`domain-kit`（值对象/状态机） |
| 版本 | `packageManager: pnpm@12.18.0`，Node ≥ 22.12；`workspace:*` 引用内部包 |

## 备选方案

| 方案 | 否决理由 |
|---|---|
| 三个独立仓库 | 契约同步靠人工，现场演示环境与版本对齐成本高 |
| npm/yarn workspaces | pnpm 磁盘与依赖隔离更适合本机（D 盘空间有限）与严格依赖方向 |
| 引入 Turborepo / Nx | 当前规模不需要远程缓存与任务编排，徒增概念与配置负担 |

## 后果

**正面**：一次安装、三端同源类型、门禁统一；客户定制时只需替换 `packages/*`。
**负面**：根脚本要求各包 script 命名一致；新增包必须显式声明依赖边界，需 CI 检查。

## 验收

- [x] `pnpm-workspace.yaml` 与根 `package.json` 已建立
- [ ] `pnpm -r typecheck` 全绿
- [ ] 静态检查无 `packages/*` 引用 `apps/*` 的 import
