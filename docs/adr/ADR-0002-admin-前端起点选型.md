# ADR-0002 · admin 前端起点选型（上游模板对比）

- **状态**：`accepted`
- **日期**：2026-11-14（同日用户确认采用方案 A）
- **决策者**：LIU
- **相关**：[`../../架构总纲.md`](../../架构总纲.md) 第 10 节 D2 · [`ADR-0001`](ADR-0001-新项目文档体系重建.md) · [`../domain/glossary.md`](../domain/glossary.md)

---

## 背景

2026-11-14 用户纠正：纯净版 `erp-admin` **不以现有 xy-admin 为基础**。xy-admin 是 `un-pany/v3-admin-vite` v5.2.0 的业务改造版（实测 `package.json`：Vue 3.5 + Vite 7 + TS 5.9 + Element Plus 2.14 + Pinia 3 + UnoCSS），内部已混入卡密销售业务、真实配置与模板残留。直接拉取上游原版模板再改造，比从业务版里「删」更干净。

需要对比两个候选上游模板，选出适合「**架构级开发 + 简历/客户展示 + 自研 monorepo**」场景的起点：

- `https://github.com/vbenjs/vue-vben-admin`（main / v5）
- `https://github.com/un-pany/v3-admin-vite`（main / v5.2）

## 事实核对（2026-11-14 查询）

| 维度 | vue-vben-admin (v5) | v3-admin-vite (v5.2) |
|---|---|---|
| Star | **33.8k**（2026-11 约 33,800） | 约 **7k**（6,993 / 7.1k） |
| 最近活动 | 最新提交 2026-11-08；最新 tag v5.7.0（2026-05-21） | 5.2 为当前主推版本；4.x 已停止维护 |
| License | MIT | MIT © 2022-present pany |
| 技术栈 | Vue3 + Vite 8 + TypeScript + Shadcn UI（Tailwind v4）；pnpm workspace **monorepo** | Vue3 + Vite + TypeScript + Element Plus + Pinia + Vue Router + pnpm 10+ + Scss/CSS Variables + UnoCSS + Axios + ESLint |
| 工程结构 | `apps/` `packages/` `internal/` `playground/` `docs/` `scripts/`；changeset / lefthook / cspell / oxfmt | 单包轻量结构，无复杂封装 |
| 内置能力 | i18n、多主题、动态路由权限、多 UI 适配（shadcn / antd / element-plus / naive-ui）、丰富 playground 示例 | 登录登出、**后端控制的动态路由权限**（5.2 新增）、按钮级权限、多环境、多主题、多布局、角色首页、403/404、移动兼容 |
| 定位表述 | 「A modern vue admin panel... Monorepo. It's fast!」 | 「AI-friendly」「简化结构：无复杂封装、无类型体操」「详细注释」「依赖保持最新」 |
| 运行环境 | 现代浏览器限定（Safari 16.4+ / Chrome 111+ / Firefox 128+），不支持 IE | Node 20.19+ 或 22.12+，pnpm 10+ |
| 生态配套 | 官方文档站、多语言 README、100+ 贡献者 | 中文文档、Gitee/atomgit 镜像、**同作者 Electron 版 `v3-electron-vite`** |
| 已知风险 | v5 与 v2 **不兼容**（断代重写）；主维护者集中；第三方评测记录约 **1.9 GB 安装体积**且聚合构建失败；学习曲线陡 | 功能相对简单，复杂企业能力需自建；单人作者；4.x 断代 |

> 数据来源：两仓库 GitHub README / About / Topics / 提交与 tag 信息，以及 2026-11-14 可检索的公开索引与评测。star 与提交为动态值，选型时已快照记录。

## 决策

**推荐 `v3-admin-vite` v5.2 作为 `apps/erp-admin` 起点**，直接 `git clone` 上游 main，不接触 xy-admin。

核心判据不是「哪个项目功能多」，而是 **「哪个能让你讲出自己的架构决策」**：

| # | 判据 | 说明 |
|---|---|---|
| 1 | **架构自主权** 🔴 | 本项目已规划自研 pnpm monorepo（`apps/*` + `packages/*` + 契约层 + 四层单向依赖）。vben **自带 monorepo**（apps/packages/internal/playground），两者正面冲突：要么整个仓库服从 vben 的形状，要么把它裁成单个 app，monorepo 优势全失且残留 `@vben/*` 依赖。轻量单包模板可自然放进 `apps/erp-admin`，**架构主角是你，不是模板** |
| 2 | 叙事可读性 | 简历要能讲清每一行。v3-admin-vite 明确「无复杂封装、无类型体操、详细注释」；vben 抽象层多，深挖易答不上，面试观感变成「用了个知名框架」 |
| 3 | 改造与现场演示成本 | vben 有 playground 大量示例需清理、1.9 GB 安装与聚合构建失败记录；独立开发者 + 客户现场一键演示，轻量模板更稳 |
| 4 | 技术连续性 | 现有经验在 Element Plus；vben v5 主打 Shadcn UI / Tailwind v4，换栈有额外学习成本 |
| 5 | AI 协作 | v3-admin-vite 以 AI-friendly 为定位（Claude Code / CodeX / Cursor / Trae / Antigravity），契合 AI 驱动改造流程 |
| 6 | 桌面端协同 | 同作者 `v3-electron-vite` 可作为全新 `apps/desktop` 的起点，与 admin 同构、`packages/ui` 复用更自然；**与旧仙域启动器无关**，不违反「Electron 全新建」 |
| 7 | 维护风险 | 两者都有断代史（vben v2→v5、v3 4.x→5.x），均需 **pin 具体 commit/tag**；v3 结构简单，pin 后自维护成本低 |

## 备选方案

| 方案 | 优点 | 缺点 | 结论 |
|---|---|---|---|
| A · v3-admin-vite v5.2（推荐） | 轻量、可读、AI-friendly、Element Plus 连续、易嵌入自研 monorepo、有同构 Electron 模板 | 企业级能力（i18n、多 UI、复杂表格封装）需自建 | ✅ 推荐 |
| B · vue-vben-admin v5 | star 高、功能最全、i18n/权限/多 UI 开箱、工程化基建完善、社区大 | 自带 monorepo 与本项目架构冲突；体量大、清理成本高；Shadcn/Tailwind 换栈；架构叙事被模板盖过 | ❌ 本项目不选 |
| C · 完全自研空壳 | 最纯净、100% 自主 | 登录/权限/布局/主题全要重写，拖慢 P0–P2，展示收益有限 | ❌ 否决 |
| D · 从 xy-admin 删业务（原始思路） | 熟悉 | 业务耦合与模板残留混杂，删不干净且违反隔离红线 | ❌ 用户已纠正 |

**何时应该改选 B**：若目标从「架构级作品展示」变为「快速交付功能极其丰富、需 i18n / 多 UI 适配 / 多人协作的企业级 ERP 产品」，或需要借 33.8k star 做技术背书，vben 更强。

## 后果

**正面**
- monorepo、契约层、四层依赖、端口适配器由本项目自主定义，ADR 可逐条讲清取舍
- 现成 RBAC（页面级 + 按钮级）、多主题、多环境、ESLint/Vitest 直接可用，P2 提速
- admin 与 desktop 同构，`packages/ui` 共享可行

**负面 / 代价**
- i18n、复杂表格封装、命令面板等需自建或引入独立依赖
- 单人上游项目，需 pin commit 并保留一份本地快照，避免上游断代影响演示
- 模板自带的 demo 页、作者品牌、捐赠链接、`.agents`/`.trae`/`.claude`、skills 安装脚本需清理

## 改造边界（若采纳 A）

**保留**：Element Plus、Pinia、Vue Router、路由守卫与权限指令、多主题/多布局、多环境、ESLint + Vitest、CSS Variables 主题机制。

**剔除 🔴**：demo 首页与示例页、登录 demo 数据、作者 logo/品牌/捐赠与推广链接、Gitee/atomgit badge、`npx skills` 安装脚本、`.agents` / `.trae` / `.claude` 等 IDE 私有配置、**husky 自动 stash 类钩子**（旧项目删库事故）。

**改造**：
1. axios 层接入 `packages/contracts` 生成的类型，禁止手写重复 DTO
2. 权限模型对接 `erp-api` 的 IAM 上下文，动态路由按契约生成
3. 主题变量抽到 `packages/ui`，供 `apps/desktop` 复用
4. 接入 CI 四关门禁 + 禁用词扫描（见 `glossary.md`）

**放置**：`apps/erp-admin/`，不改动上游目录语义；上游 commit hash 记入 `docs/runbooks/`。

## 验收

- [ ] 全仓无 xy-admin 复制痕迹，无禁用词命中
- [ ] `apps/erp-admin` 可 `pnpm dev` 启动，登录/路由/权限/主题正常
- [ ] 契约类型来自 `packages/contracts`，无手写重复 DTO
- [ ] 四关门禁全绿，模板 demo 与品牌残留清零
- [ ] 上游 commit hash 已记录，可复现

## 后续事项

- [x] 方案 A 已确认采用（2026-11-14）
- [x] 已克隆上游 `main`，快照 commit `c2c895d71d571e9c18c2453fa85469a479c79fc6`（2026-07-11）
- [x] 已移除模板 `.git`、IDE 私有配置与 husky/lint-staged 钩子，详见 `docs/runbooks/upstream.md`
- [ ] 是否将 `v3-electron-vite` 纳入 `apps/desktop` 起点评估（另开 ADR，不影响本决策）
- [x] P2 已移除模板 `/demo` `/link` 路由、动态权限演示、MCP 插件与外部 mock 代理，并接入 `@erp/contracts`
- [x] 物理删除 `src/pages/demo/`、`usePany.ts`、导航栏上游外链与 `v3-admin-vite` 缓存前缀（P5 完成，残留扫描 0 命中）
- [ ] 替换 logo / favicon 图片资源（需设计素材，不阻塞演示）
