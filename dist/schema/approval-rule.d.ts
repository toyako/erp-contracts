import { z } from 'zod';
/** 审批流配置：v1 只有采购单一种规则类型，字段留着为以后扩规则类型留口子 */
export declare const ApprovalRuleDocTypeSchema: z.ZodEnum<["purchase_order"]>;
export type ApprovalRuleDocType = z.infer<typeof ApprovalRuleDocTypeSchema>;
/** 审批规则：订单总额 ≥ 门槛时，审批须由 approverRole 角色执行；v1 只有 admin */
export declare const ApprovalRuleSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    docType: z.ZodEnum<["purchase_order"]>;
    thresholdAmount: z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>;
    approverRole: z.ZodEnum<["admin"]>;
    enabled: z.ZodBoolean;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    tenantId: string;
    enabled: boolean;
    createdAt: string;
    docType: "purchase_order";
    thresholdAmount: {
        amount: number;
        currency: string;
    };
    approverRole: "admin";
    updatedAt: string;
}, {
    id: string;
    tenantId: string;
    enabled: boolean;
    createdAt: string;
    docType: "purchase_order";
    thresholdAmount: {
        amount: number;
        currency: string;
    };
    approverRole: "admin";
    updatedAt: string;
}>;
export type ApprovalRule = z.infer<typeof ApprovalRuleSchema>;
export declare const UpdateApprovalRuleRequestSchema: z.ZodEffects<z.ZodObject<{
    thresholdAmount: z.ZodOptional<z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>>;
    enabled: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    enabled?: boolean | undefined;
    thresholdAmount?: {
        amount: number;
        currency: string;
    } | undefined;
}, {
    enabled?: boolean | undefined;
    thresholdAmount?: {
        amount: number;
        currency: string;
    } | undefined;
}>, {
    enabled?: boolean | undefined;
    thresholdAmount?: {
        amount: number;
        currency: string;
    } | undefined;
}, {
    enabled?: boolean | undefined;
    thresholdAmount?: {
        amount: number;
        currency: string;
    } | undefined;
}>;
export type UpdateApprovalRuleRequest = z.infer<typeof UpdateApprovalRuleRequestSchema>;
