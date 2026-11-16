"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodsReceiptListQuerySchema = exports.GoodsReceiptPageSchema = exports.GoodsReceiptSchema = exports.GoodsReceiptLineSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
/** 采购入库单（GRN）：每次入库动作建一张，记录本次实际收到的行与批次 */
exports.GoodsReceiptLineSchema = zod_1.z.object({
    id: common_1.IdSchema,
    skuId: common_1.IdSchema,
    quantity: zod_1.z.number().int().positive(),
    /** 本次入库进的批次（无批次时新建，batchCode = 采购单号；有批次时为既有批次） */
    batchCode: zod_1.z.string(),
});
exports.GoodsReceiptSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    receiptNo: zod_1.z.string(),
    purchaseOrderId: common_1.IdSchema,
    orderNo: zod_1.z.string(),
    lines: zod_1.z.array(exports.GoodsReceiptLineSchema),
    receivedAt: zod_1.z.string(),
    createdAt: zod_1.z.string(),
});
exports.GoodsReceiptPageSchema = (0, common_1.pageResult)(exports.GoodsReceiptSchema);
exports.GoodsReceiptListQuerySchema = zod_1.z.object({
    purchaseOrderId: zod_1.z.string().uuid().optional(),
});
