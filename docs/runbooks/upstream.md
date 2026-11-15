# 上游模板来源与复现

## 快照信息

| 项 | 值 |
|---|---|
| 仓库 | `https://github.com/un-pany/v3-admin-vite` |
| 分支 | `main` |
| commit | `c2c895d71d571e9c18c2453fa85469a479c79fc6` |
| 提交日期 | 2026-07-11 23:56:28 +08:00 |
| 上游版本 | v5.2.0 |
| 落地目录 | `apps/erp-admin` |
| 克隆日期 | 2026-11-14 |

## 复现命令

```bat
mkdir D:\Project\ERP_Project\apps
git clone --depth 1 https://github.com/un-pany/v3-admin-vite.git D:\Project\ERP_Project\apps\erp-admin
cd /d D:\Project\ERP_Project\apps\erp-admin
git checkout c2c895d71d571e9c18c2453fa85469a479c79fc6
```

> 拉完必须移除模板自带的 `.git`，否则会形成嵌套仓库。清理脚本：`node scripts/cleanup-template.cjs`。

## 已执行的清理

| 项 | 原因 |
|---|---|
| `.git` | 避免嵌套仓库，由新仓库统一管理 |
| `.github/`（FUNDING / workflows） | 模板 CI 与赞助链接不适用于本项目 |
| `.agents/` `.claude/` `.cursor/` `.trae/` | IDE 私有配置，与 `CONTRIBUTING.md` 冲突 |
| `AGENTS.md` `CLAUDE.md` | 模板 AI 规则，统一由 `架构总纲.md` 约束 |
| `README.zh-CN.md` | 模板文档，替换为本项目 `apps/erp-admin/README.md` |
| `skills-lock.json`、docs 预览图 | 模板附属资源 |
| `.husky/` + `package.json` 的 `prepare`/`lint-staged` | 🔴 **旧项目曾因 lint-staged 自动 stash/revert 删光 `src/`**，新项目不启用任何自动 stash 类钩子 |
| `LICENSE` | **保留**（MIT 合规，见 `THIRD-PARTY-NOTICES.md`） |

## 已执行的改造

- `package.json`：`name` → `@erp/admin`，`private: true`，移除作者/仓库字段
- `lint` 改为 `eslint`（不带 `--fix`，CI 不改工作区）；`test` 改为 `vitest run`（避免 watch 挂住）；新增 `typecheck`
- `.env` 标题由 `V3 Admin Vite` 改为 `ERP 管理平台`

## P2 已完成的清理与改造

- [x] 移除 `vite-plugin-mcp`（原会在 3333 端口自动起 MCP server）
- [x] 移除指向 `apifoxmock.com` 的外部代理，改为只代理本地 `erp-api`
- [x] 路由移除 `/demo`、`/link` 与动态权限演示，新增 `/erp/overview`
- [x] 新增 `src/common/apis/erp/` 接入 `@erp/contracts` 类型（零手写 DTO）
- [x] 新增 ERP 经营概览页（商品 / 库存 / 订单 / 创建示例订单）
- [x] `pnpm -r lint` / `typecheck` / `test` / 各 app `build` 全绿

## 待办（不阻塞演示）

- [x] 物理删除 `src/pages/demo/` 与作者推广 composable `usePany.ts`（`scripts/cleanup-admin-demo.cjs` 可复现）
- [x] 清除导航栏上游仓库外链、`cache-key.ts` 的 `v3-admin-vite` 前缀、`App.vue` 的推广弹窗
- [x] `scripts/check-residuals.cjs` 扫描 113 个源码文件，禁用词与上游外链 0 命中
- [ ] 替换 logo / favicon 图片资源（需设计素材，不阻塞演示）
- [ ] 权限模型从静态角色改为对接 `erp-api` 的 IAM 动态路由
- [ ] 主题变量抽到 `packages/ui` 供桌面端复用
- [ ] 接入 Prisma 适配器与 `prisma migrate` / `seed`（当前为 InMemory 演示适配器）

> 每删一批 demo 页面必须立即跑 `pnpm --filter @erp/admin build` 验证，避免旧项目「批量删文件后构建长期失败」的事故重演。
