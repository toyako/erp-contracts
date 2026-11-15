# 领域状态机

> 与 [`packages/contracts/src/schema/sales.ts`](../../packages/contracts/src/schema/sales.ts) 的 `ORDER_TRANSITIONS` 保持一致；改状态机必须同时改 schema 与本文。

## 销售订单 SalesOrder

| 当前状态 | 允许迁移到 | 触发 |
|---|---|---|
| `draft` | `confirmed` / `cancelled` | 提交订单 / 放弃 |
| `confirmed` | `paid` / `cancelled` | 收款成功 / 超时取消 |
| `paid` | `fulfilled` | 履约完成 |
| `fulfilled` | — | **终态** |
| `cancelled` | — | **终态** |

- 终态不可回退；任何非法迁移返回 `INVALID_STATE`
- 订单**不做物理删除**，只用状态标记
- 金额只由服务端计算，创建请求不含金额字段

## 库存批次 InventoryLot

```
inbound → availableQty 增加
reserve → availableQty 减少 / reservedQty 增加（totalQty 不变）
release → reservedQty 减少 / availableQty 增加
outbound → reservedQty 与 totalQty 同时减少
write_off → availableQty 与 totalQty 同时减少
```

🔴 占用只改状态不改总量；**禁止用删除记录表示售出**。库存不足返回 `INSUFFICIENT_STOCK`，且占用与订单确认必须在同一事务边界内（Application 层）。

## 履约 Fulfillment

`pending → processing → completed | failed`，失败可重试，`completed` 为终态。具体履约方式由可插拔示例模块决定，核心只消费履约事件。

---

## 从旧项目迁移的约束（只迁原则）

| 旧项目经验 | 本状态机体现 |
|---|---|
| 金额只能服务端算 | `CreateOrderRequest` 无金额字段 |
| 下单即锁库存 | `reserve` 与订单确认同事务 |
| 状态终态不可回退 | `fulfilled` / `cancelled` 无出边 |
| 订单不物理删除 | 状态标记 |
