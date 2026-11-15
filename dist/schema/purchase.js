"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePurchaseOrderRequestSchema = exports.PurchaseOrderSchema = exports.PurchaseOrderLineSchema = exports.PurchaseOrderStatusSchema = exports.CreateSupplierRequestSchema = exports.SupplierSchema = void 0;
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
/** 采购订单：draft -> submitted -> received / cancelled */
exports.PurchaseOrderStatusSchema = zod_1.z.enum(['draft', 'submitted', 'received', 'cancelled']);
exports.PurchaseOrderLineSchema = zod_1.z.object({
    id: common_1.IdSchema,
    skuId: common_1.IdSchema,
    quantity: zod_1.z.number().int().positive(),
    unitPrice: common_1.MoneySchema,
});
exports.PurchaseOrderSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    orderNo: zod_1.z.string(),
    supplierId: common_1.IdSchema,
    status: exports.PurchaseOrderStatusSchema,
    lines: zod_1.z.array(exports.PurchaseOrderLineSchema),
    total: common_1.MoneySchema,
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
