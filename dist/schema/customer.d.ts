import { z } from 'zod';
/** 客户等级：普通 / VIP */
export declare const CustomerLevelSchema: z.ZodEnum<["regular", "vip"]>;
export type CustomerLevel = z.infer<typeof CustomerLevelSchema>;
/** 客户档案：totalSpent 为服务端计算的只读字段（全部非 cancelled 订单金额之和）；balance 为预存款余额（充值/余额支付改动，不走 PATCH） */
export declare const CustomerSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    code: z.ZodString;
    name: z.ZodString;
    phone: z.ZodNullable<z.ZodString>;
    level: z.ZodEnum<["regular", "vip"]>;
    enabled: z.ZodBoolean;
    totalSpent: z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>;
    balance: z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    id: string;
    tenantId: string;
    name: string;
    enabled: boolean;
    createdAt: string;
    phone: string | null;
    level: "regular" | "vip";
    totalSpent: {
        amount: number;
        currency: string;
    };
    balance: {
        amount: number;
        currency: string;
    };
}, {
    code: string;
    id: string;
    tenantId: string;
    name: string;
    enabled: boolean;
    createdAt: string;
    phone: string | null;
    level: "regular" | "vip";
    totalSpent: {
        amount: number;
        currency: string;
    };
    balance: {
        amount: number;
        currency: string;
    };
}>;
export type Customer = z.infer<typeof CustomerSchema>;
/** 等级规则：累计消费达到 minSpent 即升到该等级；取满足条件的最高等级 */
export declare const LevelRuleSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    level: z.ZodEnum<["regular", "vip"]>;
    minSpent: z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    tenantId: string;
    level: "regular" | "vip";
    minSpent: {
        amount: number;
        currency: string;
    };
}, {
    id: string;
    tenantId: string;
    level: "regular" | "vip";
    minSpent: {
        amount: number;
        currency: string;
    };
}>;
export type LevelRule = z.infer<typeof LevelRuleSchema>;
/** 改等级门槛：金额为分，必须 ≥0 */
export declare const UpdateLevelRuleRequestSchema: z.ZodObject<{
    minSpent: z.ZodEffects<z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>;
}, "strip", z.ZodTypeAny, {
    minSpent: {
        amount: number;
        currency: string;
    };
}, {
    minSpent: {
        amount: number;
        currency: string;
    };
}>;
export type UpdateLevelRuleRequest = z.infer<typeof UpdateLevelRuleRequestSchema>;
/** 客户跟进记录：nextAt 到期未完成会进待办 */
export declare const CustomerFollowupSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    customerId: z.ZodString;
    content: z.ZodString;
    nextAt: z.ZodNullable<z.ZodString>;
    done: z.ZodBoolean;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    tenantId: string;
    createdAt: string;
    customerId: string;
    content: string;
    nextAt: string | null;
    done: boolean;
}, {
    id: string;
    tenantId: string;
    createdAt: string;
    customerId: string;
    content: string;
    nextAt: string | null;
    done: boolean;
}>;
export type CustomerFollowup = z.infer<typeof CustomerFollowupSchema>;
/** 跟进列表查询：customerId 为空 = 全客户（待办聚合用） */
export declare const CustomerFollowupListQuerySchema: z.ZodObject<{
    customerId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    customerId?: string | undefined;
}, {
    customerId?: string | undefined;
}>;
export type CustomerFollowupListQuery = z.infer<typeof CustomerFollowupListQuerySchema>;
export declare const CreateCustomerFollowupRequestSchema: z.ZodObject<{
    content: z.ZodString;
    nextAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    content: string;
    nextAt?: string | null | undefined;
}, {
    content: string;
    nextAt?: string | null | undefined;
}>;
export type CreateCustomerFollowupRequest = z.infer<typeof CreateCustomerFollowupRequestSchema>;
export declare const UpdateCustomerFollowupRequestSchema: z.ZodObject<{
    content: z.ZodOptional<z.ZodString>;
    nextAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    done: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    content?: string | undefined;
    nextAt?: string | null | undefined;
    done?: boolean | undefined;
}, {
    content?: string | undefined;
    nextAt?: string | null | undefined;
    done?: boolean | undefined;
}>;
export type UpdateCustomerFollowupRequest = z.infer<typeof UpdateCustomerFollowupRequestSchema>;
/** 余额流水：充值 topup / 余额支付 consume */
export declare const BalanceTransactionKindSchema: z.ZodEnum<["topup", "consume"]>;
export type BalanceTransactionKind = z.infer<typeof BalanceTransactionKindSchema>;
export declare const BalanceTransactionSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    customerId: z.ZodString;
    kind: z.ZodEnum<["topup", "consume"]>;
    amount: z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>;
    balanceAfter: z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>;
    remark: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    amount: {
        amount: number;
        currency: string;
    };
    id: string;
    tenantId: string;
    createdAt: string;
    customerId: string;
    kind: "topup" | "consume";
    balanceAfter: {
        amount: number;
        currency: string;
    };
    remark: string | null;
}, {
    amount: {
        amount: number;
        currency: string;
    };
    id: string;
    tenantId: string;
    createdAt: string;
    customerId: string;
    kind: "topup" | "consume";
    balanceAfter: {
        amount: number;
        currency: string;
    };
    remark: string | null;
}>;
export type BalanceTransaction = z.infer<typeof BalanceTransactionSchema>;
/** 充值：金额为分，必须 >0 */
export declare const TopupRequestSchema: z.ZodObject<{
    amount: z.ZodEffects<z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>;
    remark: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: {
        amount: number;
        currency: string;
    };
    remark?: string | undefined;
}, {
    amount: {
        amount: number;
        currency: string;
    };
    remark?: string | undefined;
}>;
export type TopupRequest = z.infer<typeof TopupRequestSchema>;
/** 余额流水列表查询：始终按客户查 */
export declare const BalanceTransactionListQuerySchema: z.ZodObject<{
    customerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    customerId: string;
}, {
    customerId: string;
}>;
export type BalanceTransactionListQuery = z.infer<typeof BalanceTransactionListQuerySchema>;
export declare const CreateCustomerRequestSchema: z.ZodObject<{
    code: z.ZodString;
    name: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    level: z.ZodDefault<z.ZodEnum<["regular", "vip"]>>;
}, "strip", z.ZodTypeAny, {
    code: string;
    name: string;
    level: "regular" | "vip";
    phone?: string | undefined;
}, {
    code: string;
    name: string;
    phone?: string | undefined;
    level?: "regular" | "vip" | undefined;
}>;
/** 客户端可省 level（默认 regular）：用 z.input 而非 z.infer，否则省略 level 的调用方通不过类型检查 */
export type CreateCustomerRequest = z.input<typeof CreateCustomerRequestSchema>;
/** 客户编辑：只传要改的字段，编码不可改 */
export declare const UpdateCustomerRequestSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    level: z.ZodOptional<z.ZodEnum<["regular", "vip"]>>;
    enabled: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    enabled?: boolean | undefined;
    phone?: string | undefined;
    level?: "regular" | "vip" | undefined;
}, {
    name?: string | undefined;
    enabled?: boolean | undefined;
    phone?: string | undefined;
    level?: "regular" | "vip" | undefined;
}>;
export type UpdateCustomerRequest = z.infer<typeof UpdateCustomerRequestSchema>;
export declare const CustomerPageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        code: z.ZodString;
        name: z.ZodString;
        phone: z.ZodNullable<z.ZodString>;
        level: z.ZodEnum<["regular", "vip"]>;
        enabled: z.ZodBoolean;
        totalSpent: z.ZodObject<{
            amount: z.ZodNumber;
            currency: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            amount: number;
            currency: string;
        }, {
            amount: number;
            currency: string;
        }>;
        balance: z.ZodObject<{
            amount: z.ZodNumber;
            currency: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            amount: number;
            currency: string;
        }, {
            amount: number;
            currency: string;
        }>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: string;
        id: string;
        tenantId: string;
        name: string;
        enabled: boolean;
        createdAt: string;
        phone: string | null;
        level: "regular" | "vip";
        totalSpent: {
            amount: number;
            currency: string;
        };
        balance: {
            amount: number;
            currency: string;
        };
    }, {
        code: string;
        id: string;
        tenantId: string;
        name: string;
        enabled: boolean;
        createdAt: string;
        phone: string | null;
        level: "regular" | "vip";
        totalSpent: {
            amount: number;
            currency: string;
        };
        balance: {
            amount: number;
            currency: string;
        };
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        code: string;
        id: string;
        tenantId: string;
        name: string;
        enabled: boolean;
        createdAt: string;
        phone: string | null;
        level: "regular" | "vip";
        totalSpent: {
            amount: number;
            currency: string;
        };
        balance: {
            amount: number;
            currency: string;
        };
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        code: string;
        id: string;
        tenantId: string;
        name: string;
        enabled: boolean;
        createdAt: string;
        phone: string | null;
        level: "regular" | "vip";
        totalSpent: {
            amount: number;
            currency: string;
        };
        balance: {
            amount: number;
            currency: string;
        };
    }[];
    total: number;
}>;
export type CustomerPage = z.infer<typeof CustomerPageSchema>;
