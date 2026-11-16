import { z } from 'zod';
import { IdSchema, MoneySchema } from './common';

/** 审批流配置：v1 只有采购单一种规则类型，字段留着为以后扩规则类型留口子 */
export const ApprovalRuleDocTypeSchema = z.enum(['purchase_order']);
export type ApprovalRuleDocType = z.infer<typeof ApprovalRuleDocTypeSchema>;

/** 审批规则：订单总额 ≥ 门槛时，审批须由 approverRole 角色执行；v1 只有 admin */
export const ApprovalRuleSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  docType: ApprovalRuleDocTypeSchema,
  thresholdAmount: MoneySchema,
  approverRole: z.enum(['admin']),
  enabled: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type ApprovalRule = z.infer<typeof ApprovalRuleSchema>;

export const UpdateApprovalRuleRequestSchema = z.object({
  thresholdAmount: MoneySchema.optional(),
  enabled: z.boolean().optional(),
}).refine((v) => v.thresholdAmount !== undefined || v.enabled !== undefined, { message: '至少改一项' });
export type UpdateApprovalRuleRequest = z.infer<typeof UpdateApprovalRuleRequestSchema>;
