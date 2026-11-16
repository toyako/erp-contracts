"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolvePriceResultSchema = exports.ResolvePriceQuerySchema = exports.PriceTierListQuerySchema = exports.PriceTierPageSchema = exports.UpdatePriceTierRequestSchema = exports.CreatePriceTierRequestSchema = exports.PriceTierSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
/**
 * 阶梯价 / 批发价：同一（skuId, channelCode）下 minQty 唯一；
 * 取价 = 满足 minQty ≤ 数量的档中 minQty 最大的一条，无匹配档回落到 PriceList 现行价。
 */
exports.PriceTierSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    skuId: common_1.IdSchema,
    channelCode: zod_1.z.string().min(1).max(64),
    minQty: zod_1.z.number().int().min(1),
    price: common_1.MoneySchema,
    enabled: zod_1.z.boolean(),
});
exports.CreatePriceTierRequestSchema = zod_1.z.object({
    skuId: common_1.IdSchema,
    channelCode: zod_1.z.string().min(1).max(64).optional(),
    minQty: zod_1.z.number().int().min(1),
    price: common_1.MoneySchema,
});
exports.UpdatePriceTierRequestSchema = zod_1.z.object({
    minQty: zod_1.z.number().int().min(1).optional(),
    price: common_1.MoneySchema.optional(),
    enabled: zod_1.z.boolean().optional(),
});
exports.PriceTierPageSchema = (0, common_1.pageResult)(exports.PriceTierSchema);
exports.PriceTierListQuerySchema = zod_1.z.object({
    skuId: zod_1.z.string().uuid().optional(),
});
exports.ResolvePriceQuerySchema = zod_1.z.object({
    skuId: zod_1.z.string().uuid(),
    quantity: zod_1.z.coerce.number().int().min(1),
    channelCode: zod_1.z.string().min(1).max(64).optional(),
});
exports.ResolvePriceResultSchema = zod_1.z.object({
    skuId: common_1.IdSchema,
    quantity: zod_1.z.number().int().min(1),
    /** 命中的阶梯档（null = 无档，回落现行价） */
    tier: exports.PriceTierSchema.nullable(),
    price: common_1.MoneySchema,
});
