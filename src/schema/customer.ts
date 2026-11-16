import { z } from 'zod';
import { IdSchema, MoneySchema, pageResult } from './common';

/** 客户等级：普通 / VIP */
export const CustomerLevelSchema = z.enum(['regular', 'vip']);
export type CustomerLevel = z.infer<typeof CustomerLevelSchema>;

/** 客户档案：totalSpent 为服务端计算的只读字段（全部非 cancelled 订单金额之和） */
export const CustomerSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  code: z.string().min(1).max(32),
  name: z.string().min(1).max(64),
  phone: z.string().nullable(),
  level: CustomerLevelSchema,
  enabled: z.boolean(),
  totalSpent: MoneySchema,
  createdAt: z.string(),
});
export type Customer = z.infer<typeof CustomerSchema>;

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
