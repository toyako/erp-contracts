# 部署手册（GitHub / Vercel / Supabase / Cloudflare）

> 🔴 **本仓库已按项目拆分为四个独立仓库**（2026-11-15）。下表是当前布局，部署命令以各仓库根目录为准。

## 当前上线状态（2026-11-15）

| 平台 | 状态 | 说明 |
|---|---|---|
| GitHub | ✅ 四仓已推送 | `erp-contracts` 已转 Public 以保证 CI 可匿名 clone |
| Vercel | ✅ 已上线 | <https://erp-admin-eosin.vercel.app>，生产分支 `main`，提交 `630f957` |
| Cloudflare Pages | ⏸ 待执行 | 需 `wrangler login` 后 `wrangler pages deploy src/renderer` |
| Supabase | ⏸ 待执行 | 需 `supabase link` 后 `supabase db push` |

### Vercel 实际踩到的三个坑（已修复，勿回退）

| 现象 | 根因 | 修复 |
|---|---|---|
| `ERR_PNPM_OUTDATED_LOCKFILE` | CI 下 pnpm 默认 `--frozen-lockfile`，而 `sed` 改了 `package.json` 的 specifier | install 命令追加 `--no-frozen-lockfile` |
| `Cannot find module 'zod'`（5 处，指向 `erp-contracts/src/**`） | `tsconfig` 的 `include: ["**/*.ts"]` 把项目内 clone 的契约副本一并编译 | `exclude` 增加 `erp-contracts` |
| 上线后 `/api/auth/captcha` 404 | 模板登录页/用户信息仍请求后端接口 | 演示模式下登录与 `users/me` 走本地实现（`VITE_DEMO_FALLBACK`） |

> 构建期 clone 契约仓库到项目内（`./erp-contracts`）并临时改写依赖路径，是 `file:` 依赖在无 monorepo 的托管平台上最省事的解法；仓库里的 `package.json` 保持 `file:../erp-contracts` 不动。

## 平台分工

| 平台 | 部署内容 | 配置 | 是否需要后端 |
|---|---|---|---|
| GitHub | 源码与文档（公开仓库，简历展示） | 根目录 git | — |
| Vercel | `apps/erp-admin` 静态 SPA | `vercel.json` | ❌ 未接后端时页面显示连接提示 |
| Supabase | PostgreSQL 数据库结构 | `supabase/config.toml` + `migrations/0001_init.sql` | 供后续 Prisma 适配器使用 |
| Cloudflare Pages | `apps/desktop/src/renderer` 作品集静态页 | `wrangler.toml` | ❌ 浏览器自动回退内置演示数据 |

> 🔴 当前 `erp-api` 默认跑 `InMemoryDatabase`，**不写 Supabase**。Supabase 迁移只是把数据库结构准备好；要让写入落库，需先实现 `PrismaDatabase extends DatabasePort`（`ADR-0005` / `ADR-0007`）。

## 前置条件（当前环境实测缺失）

| 项 | 状态 | 获取方式 |
|---|---|---|
| GitHub 凭证 / `gh` CLI | ❌ | 安装 GitHub CLI 并 `gh auth login`，或使用 Git Credential Manager |
| `vercel` CLI + 登录 | ❌ | `pnpm add -g vercel` → `vercel login` |
| `supabase` CLI + Access Token | ❌ | `pnpm add -g supabase` → `supabase login` |
| `wrangler` CLI + 登录 | ⚠️ CLI 存在但未认证 | `wrangler login` |
| 网络代理 | 需按需开启 | 访问 GitHub / Vercel / Supabase 时先开启 |

**按既定约定：外部平台操作由你执行或提供授权后再由我通过 API 驱动；AI 不擅自推代码、不反复重试网络。**

### 🔴 前置：契约仓库可见性决定 CI 能否通过

`erp-api` / `erp-admin` 的 CI 第一步要把契约仓库并列 clone 到 `../erp-contracts`。若 `erp-contracts` 是 **Private**，匿名 clone 会 403（实测首次 CI 即失败在 `Clone contracts` 这一步）。二选一：

| 方案 | 操作 | 代价 |
|---|---|---|
| A（推荐） | `erp-contracts` 改为 Public：仓库 Settings → General → 最下方 Danger Zone → Change visibility | 代码公开（简历作品通常希望如此） |
| B | 在 `erp-api` / `erp-admin` 配 Secret `CONTRACTS_TOKEN`（PAT，需 repo 读权限） | 需维护 PAT 有效期 |

工作流已兼容两种：有 `CONTRACTS_TOKEN` 走 token clone，否则回退匿名 clone，无需再改代码。

### 自动化路径（推荐）

`.github/workflows/deploy.yml` 已就位：GitHub 仓库 Settings → Secrets 配好以下值后，push 到 main 即自动部署两个静态站点；缺密钥的 job 会自动跳过，不会报错。

| Secret | 用途 |
|---|---|
| `VERCEL_TOKEN` / `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` | Vercel admin 部署 |
| `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Pages 作品集部署 |

🔴 **Supabase 迁移不进自动流程**：生产数据库结构变更按约定保持手动 `supabase db push`，避免误触发。

## 1 · GitHub（源码）

```bat
cd /d D:\Project\ERP_Project
git remote add origin https://github.com/<OWNER>/<REPO>.git
git push -u origin main
```

> 本地 `git init` + 首次提交已完成。中文 commit message 请用 UTF-8 文件 + `git commit -F <file>`，避免 CMD 的 GBK 编码坑。

推送前复核：
- [ ] `git status` 无未提交的敏感文件
- [ ] `node scripts/check-residuals.cjs` 通过（含 `.env.*` 与部署配置）
- [ ] `.env` / `node_modules/` / `dist/` / `.*.txt` 已被 `.gitignore` 忽略

## 2 · Supabase（数据库）

```bat
cd /d D:\Project\ERP_Project
supabase login
supabase link --project-ref <PROJECT_REF>
supabase db push
```

- 迁移只建表与索引，不含真实数据
- 在 Supabase 控制台为 `anon` / `service_role` 配置最小权限；生产启用 RLS
- 得到的 `DATABASE_URL` 只放进平台环境变量，**绝不写进仓库**

## 3 · Vercel（admin 静态）

```bat
cd /d D:\Project\ERP_Project
vercel login
vercel link
vercel deploy --prod
```

`vercel.json` 已指定 `installCommand` / `buildCommand` / `outputDirectory`。生产环境变量：

| 变量 | 值 | 说明 |
|---|---|---|
| `VITE_BASE_URL` | `/api` | 同源前缀 |
| `VITE_API_BASE_URL` | `/api` | 与 `apps/erp-admin/.env.production` 一致 |
| `VITE_PUBLIC_PATH` | `/` | 已修正，不再是模板子路径 |

**若要接真实后端**：在 `vercel.json` 增加 rewrites 指向已部署的 `erp-api`，并给 `VITE_API_BASE_URL` 配同源 `/api`。NestJS 需单独部署（Render / Fly / Vercel Functions 适配），本仓库尚未提供该适配。

## 4 · Cloudflare Pages（公开作品集链接）

```bat
cd /d D:\Project\ERP_Project
wrangler login
wrangler pages deploy apps/desktop/src/renderer --project-name erp-showcase
```

`apps/desktop/src/renderer/app.js` 会在浏览器中检测不到 `window.erp` 时自动回退内置虚构数据，因此**同一份静态页既能在 Electron 内跑，也能公开访问**，无需后端、无需数据库。这条链接可直接放简历。

## 部署后验证

- [ ] Vercel 首页可打开，`/erp/overview` 路由正常（hash 模式）
- [ ] Cloudflare Pages 作品集页统计卡片显示 2 / 150 / 0
- [ ] `node scripts/check-residuals.cjs` 仍为 0 命中
- [ ] 三个平台的环境变量中无任何真实凭据、真实域名、真实业务数据
- [ ] 浏览器控制台无指向第三方 mock 服务的请求

## 安全边界（ADR-0008）

- 演示数据全部虚构，禁止导入任何真实业务数据
- 生产不放宽 CSP；Electron 端保持 `contextIsolation` + `sandbox`
- 公开仓库不得出现商户号、API 私钥、真实用户数据或线上部署凭据
