"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkuPageSchema = exports.PriceListSchema = exports.SkuSchema = exports.SpuSchema = void 0;
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
