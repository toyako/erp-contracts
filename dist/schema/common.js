"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorSchema = exports.ErrorCodeSchema = exports.pageResult = exports.PageQueryParamsSchema = exports.PageQuerySchema = exports.MoneySchema = exports.IdSchema = void 0;
const zod_1 = require("zod");
exports.IdSchema = zod_1.z.string().uuid();
/** 金额以最小货币单位（分）表示，禁止浮点数 */
exports.MoneySchema = zod_1.z.object({
    amount: zod_1.z.number().int().nonnegative(),
    currency: zod_1.z.string().length(3),
});
exports.PageQuerySchema = zod_1.z.object({
    page: zod_1.z.number().int().positive().default(1),
    pageSize: zod_1.z.number().int().positive().max(200).default(20),
});
/** 供 @Query 使用：query 到 Nest 时是字符串，普通 z.number() 会拒收 */
exports.PageQueryParamsSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    pageSize: zod_1.z.coerce.number().int().positive().max(200).default(20),
    /** 列表搜索关键字（按各接口约定的字段子串匹配，如客户编码/名称/电话） */
    search: zod_1.z.string().max(128).optional(),
});
const pageResult = (item) => zod_1.z.object({
    items: zod_1.z.array(item),
    total: zod_1.z.number().int().nonnegative(),
    page: zod_1.z.number().int().positive(),
    pageSize: zod_1.z.number().int().positive(),
});
exports.pageResult = pageResult;
exports.ErrorCodeSchema = zod_1.z.enum([
    'VALIDATION_FAILED',
    'UNAUTHENTICATED',
    'FORBIDDEN',
    'NOT_FOUND',
    'CONFLICT',
    'INSUFFICIENT_STOCK',
    'INVALID_STATE',
    'INTERNAL',
]);
exports.ApiErrorSchema = zod_1.z.object({
    code: exports.ErrorCodeSchema,
    message: zod_1.z.string(),
    traceId: zod_1.z.string().optional(),
    details: zod_1.z.unknown().optional(),
});
