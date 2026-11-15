# 文档索引

> 入口：[`../架构总纲.md`](../架构总纲.md) · 门面：[`../README.md`](../README.md) · 规范：[`../CONTRIBUTING.md`](../CONTRIBUTING.md)

| 目录 | 内容 | 主要读者 | 更新时机 |
|---|---|---|---|
| [`adr/`](adr/README.md) | 架构决策记录：背景、备选、取舍、后果 | 面试官 / 接手开发者 / 客户技术方 | 新增或推翻架构决策时（只增不改） |
| [`c4/`](c4/) | C4 Context / Container / Component 图 | 面试官 / 客户 | 系统边界或容器变化时 |
| [`domain/`](domain/glossary.md) | 统一语言、限界上下文、状态机、禁用词表 | 全体开发者 | 领域模型变化时 |
| [`contracts/`](contracts/) | OpenAPI 3.1、Zod schema、错误码、事件契约 | 前后端 / 桌面端 | 接口变更时（**先改契约再改代码**） |
| [`runbooks/`](runbooks/) | 本地启动、seed、migration、打包、故障排查 | 开发者 / 演示者 | 运行方式变化时 |
| [`design/`](design/) | 各端详细设计、目录与依赖矩阵 | 开发者 | P0 设计定稿及后续重构 |
| [`showcase/`](showcase/) | 3 分钟演示脚本、讲解话术、常见问答 | 本人（面试 / 客户现场） | 演示前复核 |
| [`deploy/`](deploy/README.md) | GitHub / Vercel / Supabase / Cloudflare 部署手册 | 部署执行者 | 平台或凭证变化时 |

---

## 文档分层原则

1. **架构总纲**回答「系统是什么、边界和红线在哪」—— 唯一入口，保持精简
2. **ADR** 回答「为什么这么定、代价是什么」—— 决策不可篡改，只可 supersede
3. **C4 / domain / contracts** 回答「具体长什么样」—— 与代码同生命周期，CI 校验
4. **runbooks / showcase** 回答「怎么跑、怎么讲」—— 面向人和现场

## 与旧项目文档体系的区别

旧项目 `xy_project` 使用「项目大纲 + `docs/features/*.md` 功能详文」，是**功能视角**，目标是防止改功能时踩业务红线。

本仓库是**架构视角**，目标是讲清设计取舍并支撑客户二次定制。两者目标不同，不沿用、不混用。详见 [`adr/ADR-0001-新项目文档体系重建.md`](adr/ADR-0001-新项目文档体系重建.md)。

**当前进度**：P0–P4 已完成 —— ADR 0001–0008 全齐；`c4/` `contracts/`（含生成的 `openapi.json`）`design/` `runbooks/` `showcase/` `domain/` 均已填充；`apps/erp-admin`、`apps/erp-api`、`apps/desktop` 三个应用与 `packages/contracts` 全部落地并通过门禁。运行方式见 [`runbooks/local-setup.md`](runbooks/local-setup.md)，演示脚本见 [`showcase/demo-script.md`](showcase/demo-script.md)。

## 状态口径

| 标记 | 含义 |
|---|---|
| ✅ 已完成 | 文档定稿且经复核 |
| 🚧 进行中 | 本阶段正在编写 |
| 📋 待补充 | 已规划目录，内容待对应阶段产出 |
| ⛔ 阻塞 | 等外部决策或条件 |
