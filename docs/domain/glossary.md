# 统一语言词汇表（Ubiquitous Language）

> 相关：[`../../架构总纲.md`](../../架构总纲.md) 第 3 节「限界上下文」 · 状态机见 `state-machines.md`（P0 产出）

所有代码、契约、文档、UI 文案**只用本表术语**。同一概念出现两个名字，视为设计缺陷。

---

## 1. 核心术语

| 术语 | 英文 / 代码名 | 定义 | 所属上下文 |
|---|---|---|---|
| 租户 | `Tenant` | 数据隔离的最外层主体，一个客户对应一个租户 | IAM |
| 主体 | `Principal` | 登录身份（用户 / 服务账号），不等同于自然人 | IAM |
| 角色 | `Role` | 权限集合，绑定到主体 | IAM |
| 数字商品 | `DigitalGoods` | 可销售的无实物商品定义 | Product |
| SPU | `Spu` | 商品标准化单元，描述「是什么」 | Product |
| SKU | `Sku` | 具体可售规格，决定价格与履约方式 | Product |
| 价格表 | `PriceList` | 按租户 / 渠道 / 时段生效的价格集合 | Product |
| 库存批次 | `InventoryLot` | 一批可追踪来源的可售数量 | Inventory |
| 可用量 | `availableQty` | 可被占用的数量 | Inventory |
| 占用量 | `reservedQty` | 已下单未履约、不可再售的数量 | Inventory |
| 销售订单 | `SalesOrder` | 客户购买意愿的单据，含订单行 | Sales |
| 订单行 | `OrderLine` | 订单中针对单一 SKU 的数量与成交价 | Sales |
| 履约 | `Fulfillment` | 订单交付动作及结果 | Sales |
| 应收 | `Receivable` | 客户应付款项记录 | Finance |
| 收付款记录 | `PaymentRecord` | 与网关无关的资金流水记录 | Finance |
| 支付网关 | `PaymentGateway` | **端口接口**：收单 / 退款 / 回调验签 | Payment |
| 审计事件 | `AuditEvent` | 谁在何时对何对象做了何事，脱敏后持久化 | Platform |

---

## 2. 关键区分 🔴

| 易混概念 | 正确区分 |
|---|---|
| `availableQty` vs `reservedQty` | 两者同属一个批次，占用只改状态不改总量；**禁止**用「删除记录」表示售出 |
| `SalesOrder` vs `PaymentRecord` | 订单是业务意向，收付款是资金事实；一笔订单可对应多条流水 |
| `Spu` vs `InventoryLot` | 商品定义与库存数量分属不同上下文，禁止放在同一实体 |
| `Principal` vs `Party` | 登录身份与客户主体是不同概念，客户未登录也存在 |

---

## 3. 旧项目术语 → 新项目术语映射

仅用于**设计对照与经验迁移**，新仓库代码中不得出现左列词汇。

| xy_project 旧词 | 本仓库对应 | 处理方式 |
|---|---|---|
| 卡密 / Card | `DigitalGoods` 实例 + 履约凭证 | 收敛为可插拔示例模块 `packages/sample-digital-goods` |
| 套餐 / Plan | `Spu` + `PriceList` | 泛化，核心不保留「套餐」概念 |
| 下单锁卡 | Inventory 占用（`reservedQty`） | 抽象为状态机 |
| 激活 / 设备绑定 | `Fulfillment` 的一种实现 | 归示例模块，核心只认履约事件 |
| 支付通道选路 | `PaymentGateway` 端口 + 适配器注册 | 核心不感知具体通道 |
| 站点配置 | `Platform` 租户级参数 | 去掉所有线上凭据与域名 |
| 机器码 / machineCode | — | ❌ **不迁移** |
| 赠卡池 / source='sale' | — | ❌ **不迁移**，属特定业务规则 |

---

## 4. 禁用词表 🔴

以下词汇**禁止出现在** `apps/erp-api` 核心域、`apps/erp-admin`、`packages/contracts`、`packages/domain-kit` 的代码、类型名、注释、接口路径、UI 文案中：

```
卡密  激活  机器码  设备绑定  启动器  游戏  封包  Flash  SWF
仙域  XY_  Render  Neon  Vercel  epay  wxpay（作为业务词）
```

- 例外：仅允许出现在 `docs/adr/` 的**决策背景**与 `packages/sample-digital-goods` 内部，且示例模块必须可整体卸载
- CI 应加入禁用词扫描（P0 后接入），命中即失败

**验收口径**：删除 `packages/sample-digital-goods` 后，全仓扫描禁用词命中数为 0，且 `erp-core` 仍能编译、启动、跑通主链路。
