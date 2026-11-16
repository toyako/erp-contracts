"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerPageSchema = exports.UpdateCustomerRequestSchema = exports.CreateCustomerRequestSchema = exports.BalanceTransactionListQuerySchema = exports.TopupRequestSchema = exports.BalanceTransactionSchema = exports.BalanceTransactionKindSchema = exports.UpdateCustomerFollowupRequestSchema = exports.CreateCustomerFollowupRequestSchema = exports.CustomerFollowupListQuerySchema = exports.CustomerFollowupSchema = exports.UpdateLevelRuleRequestSchema = exports.LevelRuleSchema = exports.CustomerSchema = exports.CustomerLevelSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
/** 客户等级：普通 / VIP */
exports.CustomerLevelSchema = zod_1.z.enum(['regular', 'vip']);
/** 客户档案：totalSpent 为服务端计算的只读字段（全部非 cancelled 订单金额之和）；balance 为预存款余额（充值/余额支付改动，不走 PATCH） */
exports.CustomerSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    code: zod_1.z.string().min(1).max(32),
    name: zod_1.z.string().min(1).max(64),
    phone: zod_1.z.string().nullable(),
    level: exports.CustomerLevelSchema,
    enabled: zod_1.z.boolean(),
    totalSpent: common_1.MoneySchema,
    balance: common_1.MoneySchema,
    createdAt: zod_1.z.string(),
});
/** 等级规则：累计消费达到 minSpent 即升到该等级；取满足条件的最高等级 */
exports.LevelRuleSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    level: exports.CustomerLevelSchema,
    minSpent: common_1.MoneySchema,
});
/** 改等级门槛：金额为分，必须 ≥0 */
exports.UpdateLevelRuleRequestSchema = zod_1.z.object({
    minSpent: common_1.MoneySchema.refine((m) => m.amount >= 0, '门槛金额不能为负'),
});
/** 客户跟进记录：nextAt 到期未完成会进待办 */
exports.CustomerFollowupSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    customerId: common_1.IdSchema,
    content: zod_1.z.string().min(1).max(500),
    nextAt: zod_1.z.string().nullable(),
    done: zod_1.z.boolean(),
    createdAt: zod_1.z.string(),
});
/** 跟进列表查询：customerId 为空 = 全客户（待办聚合用） */
exports.CustomerFollowupListQuerySchema = zod_1.z.object({
    customerId: common_1.IdSchema.optional(),
});
exports.CreateCustomerFollowupRequestSchema = zod_1.z.object({
    content: zod_1.z.string().min(1, '跟进内容不能为空').max(500),
    nextAt: zod_1.z.string().nullable().optional(),
});
exports.UpdateCustomerFollowupRequestSchema = zod_1.z.object({
    content: zod_1.z.string().min(1).max(500).optional(),
    nextAt: zod_1.z.string().nullable().optional(),
    done: zod_1.z.boolean().optional(),
});
/** 余额流水：充值 topup / 余额支付 consume */
exports.BalanceTransactionKindSchema = zod_1.z.enum(['topup', 'consume']);
exports.BalanceTransactionSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    customerId: common_1.IdSchema,
    kind: exports.BalanceTransactionKindSchema,
    amount: common_1.MoneySchema,
    balanceAfter: common_1.MoneySchema,
    remark: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
});
/** 充值：金额为分，必须 >0 */
exports.TopupRequestSchema = zod_1.z.object({
    amount: common_1.MoneySchema.refine((m) => m.amount > 0, '充值金额必须大于 0'),
    remark: zod_1.z.string().max(200).optional(),
});
/** 余额流水列表查询：始终按客户查 */
exports.BalanceTransactionListQuerySchema = zod_1.z.object({
    customerId: common_1.IdSchema,
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
