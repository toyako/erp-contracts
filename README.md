# @erp/contracts

> **erp-platform 四仓库之一**：[erp-contracts](https://github.com/toyako/erp-contracts) · [erp-api](https://github.com/toyako/erp-api) · [erp-admin](https://github.com/toyako/erp-admin) · [erp-desktop](https://github.com/toyako/erp-desktop)
>
> 本地开发需四仓库并列存放；`erp-api` 与 `erp-admin` 通过 `file:../erp-contracts` 引用契约。

三端（erp-api / erp-admin / desktop）的**唯一契约真源**。见 [`ADR-0004`](../../docs/adr/ADR-0004-契约优先.md)。

## 规则

- 只放 Zod schema 与 `z.infer` 类型，**禁止任何业务实现或框架依赖**
- 类型由 `z.infer` 导出，不手写 interface
- 契约变更顺序：改 schema → 生成 → 三端同步 → `pnpm check`
- 金额用最小货币单位（分）整数，客户端不得传入金额

## 结构

| 文件 | 内容 |
|---|---|
| `schema/common.ts` | Id / Money / 分页 / 统一错误码 |
| `schema/iam.ts` | 角色、主体、登录 |
| `schema/product.ts` | SPU / SKU / 价格表 |
| `schema/inventory.ts` | 库存批次、占用、出入库 |
| `schema/sales.ts` | 订单状态机、订单行、下单请求 |

## 生成链路（P1 落地）

```
Zod schema → z.infer TS 类型 → 三端 import
           → OpenAPI 3.1 文档 → 交付客户
           → 请求校验中间件 → erp-api 运行时
```

> P0 阶段仅提供 schema 与类型；生成脚本与 CI 一致性检查在 P1 补齐。
