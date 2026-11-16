"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerPageSchema = exports.UpdateCustomerRequestSchema = exports.CreateCustomerRequestSchema = exports.CustomerSchema = exports.CustomerLevelSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
/** 客户等级：普通 / VIP */
exports.CustomerLevelSchema = zod_1.z.enum(['regular', 'vip']);
/** 客户档案：totalSpent 为服务端计算的只读字段（全部非 cancelled 订单金额之和） */
exports.CustomerSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    code: zod_1.z.string().min(1).max(32),
    name: zod_1.z.string().min(1).max(64),
    phone: zod_1.z.string().nullable(),
    level: exports.CustomerLevelSchema,
    enabled: zod_1.z.boolean(),
    totalSpent: common_1.MoneySchema,
    createdAt: zod_1.z.string(),
});
exports.CreateCustomerRequestSchema = zod_1.z.object({
    code: zod_1.z.string().min(1, '编码不能为空').max(32),
    name: zod_1.z.string().min(1, '名称不能为空').max(64),
    phone: zod_1.z.string().optional(),
    level: exports.CustomerLevelSchema.default('regular'),
});
/** 客户编辑：只传要改的字段，编码不可改 */
exports.UpdateCustomerRequestSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(64).optional(),
    phone: zod_1.z.string().optional(),
    level: exports.CustomerLevelSchema.optional(),
    enabled: zod_1.z.boolean().optional(),
});
exports.CustomerPageSchema = (0, common_1.pageResult)(exports.CustomerSchema);
