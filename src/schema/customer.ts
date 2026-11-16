import { z } from 'zod';
import { IdSchema, MoneySchema, pageResult } from './common';

/** 客户等级：普通 / VIP */
export const CustomerLevelSchema = z.enum(['regular', 'vip']);
export type CustomerLevel = z.infer<typeof CustomerLevelSchema>;

/** 客户档案：totalSpent 为服务端计算的只读字段（全部非 cancelled 订单金额之和）；balance 为预存款余额（充值/余额支付改动，不走 PATCH） */
export const CustomerSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  code: z.string().min(1).max(32),
  name: z.string().min(1).max(64),
  phone: z.string().nullable(),
  level: CustomerLevelSchema,
  enabled: z.boolean(),
  totalSpent: MoneySchema,
  balance: MoneySchema,
  createdAt: z.string(),
});
export type Customer = z.infer<typeof CustomerSchema>;

/** 等级规则：累计消费达到 minSpent 即升到该等级；取满足条件的最高等级 */
export const LevelRuleSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  level: CustomerLevelSchema,
  minSpent: MoneySchema,
});
export type LevelRule = z.infer<typeof LevelRuleSchema>;

/** 改等级门槛：金额为分，必须 ≥0 */
export const UpdateLevelRuleRequestSchema = z.object({
  minSpent: MoneySchema.refine((m) => m.amount >= 0, '门槛金额不能为负'),
});
export type UpdateLevelRuleRequest = z.infer<typeof UpdateLevelRuleRequestSchema>;

/** 客户跟进记录：nextAt 到期未完成会进待办 */
export const CustomerFollowupSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  customerId: IdSchema,
  content: z.string().min(1).max(500),
  nextAt: z.string().nullable(),
  done: z.boolean(),
  createdAt: z.string(),
});
export type CustomerFollowup = z.infer<typeof CustomerFollowupSchema>;

/** 跟进列表查询：customerId 为空 = 全客户（待办聚合用） */
export const CustomerFollowupListQuerySchema = z.object({
  customerId: IdSchema.optional(),
});
export type CustomerFollowupListQuery = z.infer<typeof CustomerFollowupListQuerySchema>;

export const CreateCustomerFollowupRequestSchema = z.object({
  content: z.string().min(1, '跟进内容不能为空').max(500),
  nextAt: z.string().nullable().optional(),
});
export type CreateCustomerFollowupRequest = z.infer<typeof CreateCustomerFollowupRequestSchema>;

export const UpdateCustomerFollowupRequestSchema = z.object({
  content: z.string().min(1).max(500).optional(),
  nextAt: z.string().nullable().optional(),
  done: z.boolean().optional(),
});
export type UpdateCustomerFollowupRequest = z.infer<typeof UpdateCustomerFollowupRequestSchema>;

/** 余额流水：充值 topup / 余额支付 consume */
export const BalanceTransactionKindSchema = z.enum(['topup', 'consume']);
export type BalanceTransactionKind = z.infer<typeof BalanceTransactionKindSchema>;

export const BalanceTransactionSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  customerId: IdSchema,
  kind: BalanceTransactionKindSchema,
  amount: MoneySchema,
  balanceAfter: MoneySchema,
  remark: z.string().nullable(),
  createdAt: z.string(),
});
export type BalanceTransaction = z.infer<typeof BalanceTransactionSchema>;

/** 充值：金额为分，必须 >0 */
export const TopupRequestSchema = z.object({
  amount: MoneySchema.refine((m) => m.amount > 0, '充值金额必须大于 0'),
  remark: z.string().max(200).optional(),
});
export type TopupRequest = z.infer<typeof TopupRequestSchema>;

/** 余额流水列表查询：始终按客户查 */
export const BalanceTransactionListQuerySchema = z.object({
  customerId: IdSchema,
});
export type BalanceTransactionListQuery = z.infer<typeof BalanceTransactionListQuerySchema>;

export const CreateCustomerRequestSchema = z.object({
  code: z.string().min(1, '编码不能为空').max(32),
  name: z.string().min(1, '名称不能为空').max(64),
  phone: z.string().optional(),
  level: CustomerLevelSchema.default('regular'),
});
/** 客户端可省 level（默认 regular）：用 z.input 而非 z.infer，否则省略 level 的调用方通不过类型检查 */
export type CreateCustomerRequest = z.input<typeof CreateCustomerRequestSchema>;

/** 客户编辑：只传要改的字段，编码不可改 */
export const UpdateCustomerRequestSchema = z.object({
  name: z.string().min(1).max(64).optional(),
  phone: z.string().optional(),
  level: CustomerLevelSchema.optional(),
  enabled: z.boolean().optional(),
});
export type UpdateCustomerRequest = z.infer<typeof UpdateCustomerRequestSchema>;

export const CustomerPageSchema = pageResult(CustomerSchema);
export type CustomerPage = z.infer<typeof CustomerPageSchema>;
