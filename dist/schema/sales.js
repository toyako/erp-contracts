"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderPageSchema = exports.CreateOrderRequestSchema = exports.SalesOrderSchema = exports.OrderLineSchema = exports.ORDER_TRANSITIONS = exports.OrderStatusSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
exports.OrderStatusSchema = zod_1.z.enum([
    'draft',
    'confirmed',
    'paid',
    'fulfilled',
    'cancelled',
]);
/** 显式状态机：终态不可回退，见 docs/domain/state-machines.md */
exports.ORDER_TRANSITIONS = {
    draft: ['confirmed', 'cancelled'],
    confirmed: ['paid', 'cancelled'],
    paid: ['fulfilled'],
    fulfilled: [],
    cancelled: [],
};
exports.OrderLineSchema = zod_1.z.object({
    id: common_1.IdSchema,
    skuId: common_1.IdSchema,
    quantity: zod_1.z.number().int().positive(),
    /** 成交价由服务端定价服务写入 */
    unitPrice: common_1.MoneySchema,
});
exports.SalesOrderSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    orderNo: zod_1.z.string().min(1).max(64),
    status: exports.OrderStatusSchema,
    lines: zod_1.z.array(exports.OrderLineSchema).min(1),
    total: common_1.MoneySchema,
    createdAt: zod_1.z.string().datetime(),
});
/** 客户端只传 SKU 与数量，绝不接收金额 */
exports.CreateOrderRequestSchema = zod_1.z.object({
    lines: zod_1.z
        .array(zod_1.z.object({ skuId: common_1.IdSchema, quantity: zod_1.z.number().int().positive() }))
        .min(1),
});
exports.SalesOrderPageSchema = (0, common_1.pageResult)(exports.SalesOrderSchema);
