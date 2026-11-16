"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StocktakePageSchema = exports.CreateStocktakeRequestSchema = exports.StocktakeSchema = exports.STOCKTAKE_TRANSITIONS = exports.StocktakeStatusSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
/** 盘点：draft -> confirmed；draft -> cancelled */
exports.StocktakeStatusSchema = zod_1.z.enum(['draft', 'confirmed', 'cancelled']);
/** 显式状态机：终态不可回退，照抄退货单的做法 */
exports.STOCKTAKE_TRANSITIONS = {
    draft: ['confirmed', 'cancelled'],
    confirmed: [],
    cancelled: [],
};
/**
 * 盘点单：针对单个批次实盘，systemQty 为建单时该批次 totalQty 的快照，
 * difference = countedQty - systemQty，由服务端算并存下来（不随后续库存变而变）
 */
exports.StocktakeSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    stocktakeNo: zod_1.z.string(),
    lotId: common_1.IdSchema,
    skuId: common_1.IdSchema,
    countedQty: zod_1.z.number().int().nonnegative(),
    systemQty: zod_1.z.number().int().nonnegative(),
    difference: zod_1.z.number().int(),
    status: exports.StocktakeStatusSchema,
    createdAt: zod_1.z.string(),
    confirmedAt: zod_1.z.string().nullable(),
});
exports.CreateStocktakeRequestSchema = zod_1.z.object({
    lotId: common_1.IdSchema,
    countedQty: zod_1.z.number().int().nonnegative(),
});
exports.StocktakePageSchema = (0, common_1.pageResult)(exports.StocktakeSchema);
