"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSkuRequestSchema = exports.UpdatePriceRequestSchema = exports.CreatePriceRequestSchema = exports.PriceListPageSchema = exports.CreateSkuRequestSchema = exports.SkuPageSchema = exports.PriceListSchema = exports.SkuSchema = exports.SpuSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
exports.SpuSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    name: zod_1.z.string().min(1).max(128),
    categoryCode: zod_1.z.string().min(1).max(64),
    description: zod_1.z.string().max(2000).optional(),
    enabled: zod_1.z.boolean(),
});
exports.SkuSchema = zod_1.z.object({
    id: common_1.IdSchema,
    spuId: common_1.IdSchema,
    code: zod_1.z.string().min(1).max(64),
    spec: zod_1.z.string().max(256),
    unit: zod_1.z.string().min(1).max(32),
    enabled: zod_1.z.boolean(),
});
/** 价格由服务端维护，创建订单时客户端不得传金额 */
exports.PriceListSchema = zod_1.z.object({
    id: common_1.IdSchema,
    skuId: common_1.IdSchema,
    channelCode: zod_1.z.string().min(1).max(64),
    price: common_1.MoneySchema,
    effectiveFrom: zod_1.z.string().datetime(),
    effectiveTo: zod_1.z.string().datetime().optional(),
});
exports.SkuPageSchema = (0, common_1.pageResult)(exports.SkuSchema);
/** 新建 SKU：编码与所属 SPU 必填；SKU 本身不带价格，价格另走价格档案 */
exports.CreateSkuRequestSchema = zod_1.z.object({
    spuId: common_1.IdSchema,
    code: zod_1.z.string().min(1).max(64),
    spec: zod_1.z.string().max(256),
    unit: zod_1.z.string().min(1).max(32),
    enabled: zod_1.z.boolean().default(true),
});
exports.PriceListPageSchema = (0, common_1.pageResult)(exports.PriceListSchema);
/**
 * 新建价格：channelCode 缺省为 'DIRECT'（与 Prisma 种子一致，线上在用的渠道码）；
 * effectiveFrom 缺省时服务端取当前时间。
 * 金额必须为正（MoneySchema 本身允许 0，价格档案里 0 元无意义）。
 */
exports.CreatePriceRequestSchema = zod_1.z.object({
    skuId: common_1.IdSchema,
    channelCode: zod_1.z.string().min(1).max(64).default('DIRECT'),
    price: zod_1.z.object({
        amount: zod_1.z.number().int().positive(),
        currency: zod_1.z.string().length(3),
    }),
    effectiveFrom: zod_1.z.string().datetime().optional(),
});
/** 改价：只改金额与/或截止时间；生效自、渠道与 SKU 不可改 */
exports.UpdatePriceRequestSchema = zod_1.z.object({
    price: zod_1.z
        .object({
        amount: zod_1.z.number().int().positive(),
        currency: zod_1.z.string().length(3),
    })
        .optional(),
    effectiveTo: zod_1.z.string().datetime().nullable().optional(),
});
/** SKU 编辑：只传要改的字段，编码与所属 SPU 不可改 */
exports.UpdateSkuRequestSchema = zod_1.z.object({
    spec: zod_1.z.string().max(256).optional(),
    unit: zod_1.z.string().min(1).max(32).optional(),
    enabled: zod_1.z.boolean().optional(),
});
