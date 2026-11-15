# 本地启动与故障排查

## 前置

| 项 | 版本 | 检查 |
|---|---|---|
| Node | ≥ 22.12（实测 22.22.2） | `node -v` |
| pnpm | ≥ 10（实测 12.18.0） | `pnpm -v` |
| Docker | 可选，仅 Live 模式需要 | `docker -v` |

## 一键启动

```bash
cd D:\Project\ERP_Project
cp .env.example .env
pnpm install
pnpm dev                    # 启动 erp-admin
```

需要后端时（P1 起可用）：

```bash
pnpm db:up                  # Postgres + Redis
pnpm --filter @erp/api dev
```

### 已落地的三个应用

```bash
pnpm --filter @erp/contracts build       # 契约层必须先编译出 dist
pnpm --filter @erp/api build && pnpm --filter @erp/api start   # 127.0.0.1:3000/api
pnpm --filter @erp/admin dev             # 127.0.0.1:3333，代理 /api 到本地后端
pnpm --filter @erp/desktop build && pnpm --filter @erp/desktop start
node scripts/generate-openapi.cjs        # 重新生成 docs/contracts/openapi.json
node scripts/smoke-api.cjs               # 12 项全链路冒烟
```

桌面端 `DESKTOP_MODE=demo`（默认）用内置数据，**无需 Docker、无需外网、无需账号**；`DESKTOP_MODE=live` 连本地 erp-api。

> Electron 二进制在 CI/沙箱可用 `ELECTRON_SKIP_BINARY_DOWNLOAD=1` 跳过下载，只跑 typecheck/build。

## 门禁

```bash
pnpm check                  # lint + typecheck + test + build
pnpm --filter @erp/admin build
```

任何改动合并前必须全绿；每删一批模板 demo 页面后立即跑一次 build。

## 故障排查

| 现象 | 根因 | 处理 |
|---|---|---|
| `pnpm install` 报 workspace 找不到包 | 某 app 引用了尚未创建的 `packages/*` | 先建包骨架，或临时移除该依赖 |
| `vitest` 挂住不退出 | 模板默认是 watch 模式 | 已改为 `vitest run`，勿改回 |
| commit 后 `src/` 被清空 | lint-staged 自动 stash/revert | 本项目已移除 husky/lint-staged，**禁止重新引入** |
| 端口 5432/6379 占用 | 本地已有 Postgres/Redis | 改 `.env` 的 `POSTGRES_PORT` / `REDIS_PORT` |
| 构建报模板 demo 缺失文件 | 批量删除未验证 | 按 `upstream.md` 逐批删、每批 build |
| Electron 起不来 | 会话注入 `ELECTRON_RUN_AS_NODE` | `unset ELECTRON_RUN_AS_NODE` 后重试（P3） |
| `ERR_PNPM_IGNORED_BUILDS`、install 返回 1 | pnpm 12 逐步审批依赖构建脚本，esbuild postinstall 未放行 | `pnpm-workspace.yaml` 的 `allowBuilds: { esbuild: true }`（**pnpm 12 用 `allowBuilds`；`onlyBuiltDependencies` 已在 v11 移除**） |
| store 从 C 盘改到 `D:\.pnpm-store` | 跨盘无法硬链接，pnpm 自动换 store | 环境特性，可忽略；如需固定请设 `storeDir` |
| `pnpm check` 被沙箱拦 | `vite build` 会清空 `dist/`，被判定为批量删除 | 分开跑 `pnpm lint` / `typecheck` / `test` / `build`，或由本机手动执行完整 check |
| 测试时 3333 端口被占用 | 模板 `vite-plugin-mcp` 会启动 MCP server | P2 清理模板残留时移除该插件 |

## 演示前检查

- [ ] 断网 + 未启动 Docker 时桌面 `demo` 模式仍可跑通
- [ ] `.env` 无真实凭据，演示数据已由 seed 重建
- [ ] `pnpm check` 全绿
- [ ] 上游 commit 与许可声明可查（`upstream.md` / `THIRD-PARTY-NOTICES.md`）
