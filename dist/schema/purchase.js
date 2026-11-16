"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceivePurchaseOrderRequestSchema = exports.RejectPurchaseOrderRequestSchema = exports.PurchaseOrderPageSchema = exports.CreatePurchaseOrderRequestSchema = exports.PurchaseOrderSchema = exports.PurchaseOrderLineSchema = exports.PURCHASE_ORDER_TRANSITIONS = exports.PurchaseOrderStatusSchema = exports.UpdateSupplierRequestSchema = exports.CreateSupplierRequestSchema = exports.SupplierSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
/** 供应商（采购上下文） */
exports.SupplierSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    code: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    contact: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    rating: zod_1.z.number().int().min(1).max(5),
    enabled: zod_1.z.boolean(),
});
exports.CreateSupplierRequestSchema = zod_1.z.object({
    code: zod_1.z.string().min(1, '编码不能为空'),
    name: zod_1.z.string().min(1, '名称不能为空'),
    contact: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    rating: zod_1.z.number().int().min(1).max(5).default(3),
});
/** 供应商编辑：只传要改的字段，编码不可改 */
exports.UpdateSupplierRequestSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    contact: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    rating: zod_1.z.number().int().min(1).max(5).optional(),
    enabled: zod_1.z.boolean().optional(),
});
/** 采购订单：draft -> submitted（待审核） -> approved（已审核） -> received / 部分入库 / cancelled；驳回为终态 */
exports.PurchaseOrderStatusSchema = zod_1.z.enum(['draft', 'submitted', 'approved', 'partially_received', 'received', 'rejected', 'cancelled']);
/** 显式状态机：终态不可回退，照抄销售订单的做法；rejected 沿用退货单/调拨单的终态口径 */
exports.PURCHASE_ORDER_TRANSITIONS = {
    draft: ['submitted', 'cancelled'],
    submitted: ['approved', 'rejected', 'cancelled'],
    approved: ['partially_received', 'received', 'cancelled'],
    partially_received: ['received', 'cancelled'],
    received: [],
    rejected: [],
    cancelled: [],
};
exports.PurchaseOrderLineSchema = zod_1.z.object({
    id: common_1.IdSchema,
    skuId: common_1.IdSchema,
    quantity: zod_1.z.number().int().positive(),
    unitPrice: common_1.MoneySchema,
    /** 已收数量（分批入库累加），默认 0 */
    receivedQty: zod_1.z.number().int().nonnegative(),
});
exports.PurchaseOrderSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    orderNo: zod_1.z.string(),
    supplierId: common_1.IdSchema,
    status: exports.PurchaseOrderStatusSchema,
    lines: zod_1.z.array(exports.PurchaseOrderLineSchema),
    total: common_1.MoneySchema,
    /** 驳回原因（仅 rejected 时有值） */
    rejectReason: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
});
exports.CreatePurchaseOrderRequestSchema = zod_1.z.object({
    supplierId: common_1.IdSchema,
    lines: zod_1.z
        .array(zod_1.z.object({
        skuId: common_1.IdSchema,
        quantity: zod_1.z.number().int().positive(),
    }))
        .min(1, '至少一行明细'),
});
exports.PurchaseOrderPageSchema = (0, common_1.pageResult)(exports.PurchaseOrderSchema);
/** 驳回请求：原因必填（空原因 400），沿用退货单拒绝原因的做法 */
exports.RejectPurchaseOrderRequestSchema = zod_1.z.object({
    reason: zod_1.z.string().min(1, '驳回原因不能为空').max(256),
});
/**
 * 入库请求：lines 缺省 = 整单收完（老行为，兼容冒烟与旧调用）；
 * 传 lines = 按行收指定数量（每行须 >0 且 ≤ 剩余量）。
 * 整个 body 可缺省（空 body 解析为 {}，即整单收完）。
 */
exports.ReceivePurchaseOrderRequestSchema = zod_1.z
    .object({
    lines: zod_1.z
        .array(zod_1.z.object({
        skuId: common_1.IdSchema,
        quantity: zod_1.z.number().int().positive(),
    }))
        .min(1)
        .optional(),
})
    .default({});
