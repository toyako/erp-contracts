"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateApprovalRuleRequestSchema = exports.ApprovalRuleSchema = exports.ApprovalRuleDocTypeSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
/** 审批流配置：v1 只有采购单一种规则类型，字段留着为以后扩规则类型留口子 */
exports.ApprovalRuleDocTypeSchema = zod_1.z.enum(['purchase_order']);
/** 审批规则：订单总额 ≥ 门槛时，审批须由 approverRole 角色执行；v1 只有 admin */
exports.ApprovalRuleSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    docType: exports.ApprovalRuleDocTypeSchema,
    thresholdAmount: common_1.MoneySchema,
    approverRole: zod_1.z.enum(['admin']),
    enabled: zod_1.z.boolean(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
});
exports.UpdateApprovalRuleRequestSchema = zod_1.z.object({
    thresholdAmount: common_1.MoneySchema.optional(),
    enabled: zod_1.z.boolean().optional(),
}).refine((v) => v.thresholdAmount !== undefined || v.enabled !== undefined, { message: '至少改一项' });
