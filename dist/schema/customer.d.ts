import { z } from 'zod';
/** 客户等级：普通 / VIP */
export declare const CustomerLevelSchema: z.ZodEnum<["regular", "vip"]>;
export type CustomerLevel = z.infer<typeof CustomerLevelSchema>;
/** 客户档案：totalSpent 为服务端计算的只读字段（全部非 cancelled 订单金额之和） */
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
}>;
export type Customer = z.infer<typeof CustomerSchema>;
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
    }[];
    total: number;
}>;
export type CustomerPage = z.infer<typeof CustomerPageSchema>;
