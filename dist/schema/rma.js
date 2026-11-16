"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RmaPageSchema = exports.CreateRmaRequestSchema = exports.RmaSchema = exports.RMA_TRANSITIONS = exports.RmaStatusSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
/** 售后退货：requested -> approved -> received -> refunded；requested -> rejected；requested/approved -> cancelled */
exports.RmaStatusSchema = zod_1.z.enum(['requested', 'approved', 'rejected', 'received', 'refunded', 'cancelled']);
/** 显式状态机：终态不可回退，照抄采购订单的做法 */
exports.RMA_TRANSITIONS = {
    requested: ['approved', 'rejected', 'cancelled'],
    approved: ['received', 'cancelled'],
    rejected: [],
    received: ['refunded'],
    refunded: [],
    cancelled: [],
};
/** 退货单：一单只针对一个订单里一个 SKU 的数量，多 SKU 分多单申请 */
exports.RmaSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    rmaNo: zod_1.z.string(),
    orderId: common_1.IdSchema,
    skuId: common_1.IdSchema,
    quantity: zod_1.z.number().int().positive(),
    reason: zod_1.z.string().min(1).max(200),
    status: exports.RmaStatusSchema,
    /** 退款金额由服务端按行单价 × 数量算，客户端不传金额 */
    refundAmount: common_1.MoneySchema,
    createdAt: zod_1.z.string(),
    receivedAt: zod_1.z.string().nullable(),
});
exports.CreateRmaRequestSchema = zod_1.z.object({
    orderId: common_1.IdSchema,
    skuId: common_1.IdSchema,
    quantity: zod_1.z.number().int().positive(),
    reason: zod_1.z.string().min(1, '退货原因不能为空').max(200),
});
exports.RmaPageSchema = (0, common_1.pageResult)(exports.RmaSchema);
