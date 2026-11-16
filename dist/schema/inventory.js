"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryLotPageSchema = exports.StockMovementSchema = exports.ReserveStockRequestSchema = exports.InventoryLotSchema = exports.DEFAULT_LOCATION = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
/** 默认仓库：原型稿里的主仓；新批次（采购/RMA 入库）无指定仓库时落这里 */
exports.DEFAULT_LOCATION = '主仓';
exports.InventoryLotSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    skuId: common_1.IdSchema,
    batchCode: zod_1.z.string().min(1).max(64),
    /** 仓库/库位：批次归属的物理位置，调拨在不同位置间移动库存 */
    location: zod_1.z.string().min(1).max(32),
    /** 可被占用的数量 */
    availableQty: zod_1.z.number().int().nonnegative(),
    /** 已下单未履约、不可再售的数量 */
    reservedQty: zod_1.z.number().int().nonnegative(),
    totalQty: zod_1.z.number().int().nonnegative(),
});
/** 占用只改状态不改总量，禁止用删除记录表示售出 */
exports.ReserveStockRequestSchema = zod_1.z.object({
    skuId: common_1.IdSchema,
    quantity: zod_1.z.number().int().positive(),
    orderId: common_1.IdSchema,
});
exports.StockMovementSchema = zod_1.z.object({
    id: common_1.IdSchema,
    lotId: common_1.IdSchema,
    type: zod_1.z.enum(['inbound', 'reserve', 'release', 'outbound', 'write_off']),
    quantity: zod_1.z.number().int().positive(),
    referenceId: common_1.IdSchema.optional(),
    createdAt: zod_1.z.string().datetime(),
});
exports.InventoryLotPageSchema = (0, common_1.pageResult)(exports.InventoryLotSchema);
