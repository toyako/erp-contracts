# 接口契约

> 单一真源在 [`packages/contracts`](../../packages/contracts/README.md)，本目录放**契约规范与流程**，不重复定义类型。决策见 [`ADR-0004`](../adr/ADR-0004-契约优先.md)。

## 变更流程 🔴

1. 改 `packages/contracts/src/schema/*.ts`
2. `pnpm --filter @erp/contracts typecheck`
3. 生成 OpenAPI 3.1 与 TS 类型（生成脚本 P1 落地）
4. 同步 `erp-api` / `erp-admin` / `desktop`
5. `pnpm check` 全绿方可合并

**禁止**在任一 app 内手写重复 DTO；破坏性变更必须在 ADR 中记录原因与迁移方案。

## 统一约定

| 项 | 约定 |
|---|---|
| 传输 | JSON，UTF-8 |
| 分页 | `PageQuerySchema`（page / pageSize ≤ 200），返回 `pageResult` 结构 |
| 错误 | `ApiErrorSchema`：`code` + `message` + 可选 `traceId` / `details` |
| 错误码 | `VALIDATION_FAILED` / `UNAUTHENTICATED` / `FORBIDDEN` / `NOT_FOUND` / `CONFLICT` / `INSUFFICIENT_STOCK` / `INVALID_STATE` / `INTERNAL` |
| 金额 | `MoneySchema`，最小货币单位整数 + 三位币种码；**服务端定价** |
| 时间 | ISO 8601 字符串（`z.string().datetime()`） |
| ID | UUID 字符串 |

## 核心端点（P1 实现）

| 方法 | 路径 | 请求 | 响应 |
|---|---|---|---|
| POST | `/auth/login` | `LoginRequest` | `LoginResponse` |
| GET | `/iam/principals` | `PageQuery` | `PrincipalPage` |
| GET | `/products/skus` | `PageQuery` | `SkuPage` |
| GET | `/inventory/lots` | `PageQuery` | `InventoryLotPage` |
| POST | `/inventory/reservations` | `ReserveStockRequest` | `InventoryLot` |
| POST | `/sales/orders` | `CreateOrderRequest` | `SalesOrder` |
| GET | `/sales/orders` | `PageQuery` | `SalesOrderPage` |

✅ **已落地**：`scripts/generate-openapi.cjs` 从 `@erp/contracts` 的 Zod schema 反射生成 [`openapi.json`](openapi.json)（8 paths / 8 schemas）。执行 `node scripts/generate-openapi.cjs`（需先 `pnpm --filter @erp/contracts build`）。**手写 yaml 不是真源**，禁止直接编辑生成物。
