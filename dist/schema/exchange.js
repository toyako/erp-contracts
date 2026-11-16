"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangePageSchema = exports.CreateExchangeRequestSchema = exports.RejectExchangeRequestSchema = exports.ExchangeSchema = exports.EXCHANGE_TRANSITIONS = exports.ExchangeStatusSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
/** 换货：requested -> approved -> received -> exchanged；requested -> rejected；requested/approved/received -> cancelled */
exports.ExchangeStatusSchema = zod_1.z.enum(['requested', 'approved', 'rejected', 'received', 'exchanged', 'cancelled']);
/** 显式状态机：终态不可回退，照抄退货单的做法 */
exports.EXCHANGE_TRANSITIONS = {
    requested: ['approved', 'rejected', 'cancelled'],
    approved: ['received', 'cancelled'],
    rejected: [],
    received: ['exchanged', 'cancelled'],
    exchanged: [],
    cancelled: [],
};
/** 换货单：一次换货只针对一个订单里一个退货 SKU + 一个换入 SKU 的数量，多 SKU 分多单申请 */
exports.ExchangeSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    exchangeNo: zod_1.z.string(),
    orderId: common_1.IdSchema,
    returnSkuId: common_1.IdSchema,
    returnQty: zod_1.z.number().int().positive(),
    exchangeSkuId: common_1.IdSchema,
    exchangeQty: zod_1.z.number().int().positive(),
    /** 差价由服务端按“换入价 − 退货价”算：正数=客户补差价，负数=应退差价；只记数，不走真实支付 */
    diffAmount: common_1.MoneySchema.nullable(),
    status: exports.ExchangeStatusSchema,
    /** 拒绝原因：仅 rejected 状态下有值，由审核人在拒绝时填写 */
    rejectReason: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
    receivedAt: zod_1.z.string().nullable(),
    exchangedAt: zod_1.z.string().nullable(),
});
/** 拒绝换货：原因必填（1–200 字），落库到 rejectReason */
exports.RejectExchangeRequestSchema = zod_1.z.object({
    reason: zod_1.z.string().min(1, '拒绝原因不能为空').max(200, '拒绝原因最多 200 字'),
});
exports.CreateExchangeRequestSchema = zod_1.z.object({
    orderId: common_1.IdSchema,
    returnSkuId: common_1.IdSchema,
    returnQty: zod_1.z.number().int().positive(),
    exchangeSkuId: common_1.IdSchema,
    exchangeQty: zod_1.z.number().int().positive(),
});
exports.ExchangePageSchema = (0, common_1.pageResult)(exports.ExchangeSchema);
