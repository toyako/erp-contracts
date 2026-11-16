import { z } from 'zod';
export declare const OrderStatusSchema: z.ZodEnum<["draft", "confirmed", "paid", "fulfilled", "cancelled"]>;
export type OrderStatus = z.infer<typeof OrderStatusSchema>;
/** 显式状态机：终态不可回退，见 docs/domain/state-machines.md */
export declare const ORDER_TRANSITIONS: Record<OrderStatus, readonly OrderStatus[]>;
export declare const OrderLineSchema: z.ZodObject<{
    id: z.ZodString;
    skuId: z.ZodString;
    quantity: z.ZodNumber;
    /** 成交价由服务端定价服务写入 */
    unitPrice: z.ZodObject<{
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
    skuId: string;
    quantity: number;
    unitPrice: {
        amount: number;
        currency: string;
    };
}, {
    id: string;
    skuId: string;
    quantity: number;
    unitPrice: {
        amount: number;
        currency: string;
    };
}>;
export type OrderLine = z.infer<typeof OrderLineSchema>;
export declare const SalesOrderSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    orderNo: z.ZodString;
    /** 关联客户：可选可空，老数据仍能校验；建单时传了就存，不传为 null */
    customerId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodEnum<["draft", "confirmed", "paid", "fulfilled", "cancelled"]>;
    lines: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        skuId: z.ZodString;
        quantity: z.ZodNumber;
        /** 成交价由服务端定价服务写入 */
        unitPrice: z.ZodObject<{
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
        skuId: string;
        quantity: number;
        unitPrice: {
            amount: number;
            currency: string;
        };
    }, {
        id: string;
        skuId: string;
        quantity: number;
        unitPrice: {
            amount: number;
            currency: string;
        };
    }>, "many">;
    total: z.ZodObject<{
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
    status: "draft" | "confirmed" | "paid" | "fulfilled" | "cancelled";
    total: {
        amount: number;
        currency: string;
    };
    id: string;
    tenantId: string;
    createdAt: string;
    orderNo: string;
    lines: {
        id: string;
        skuId: string;
        quantity: number;
        unitPrice: {
            amount: number;
            currency: string;
        };
    }[];
    customerId?: string | null | undefined;
}, {
    status: "draft" | "confirmed" | "paid" | "fulfilled" | "cancelled";
    total: {
        amount: number;
        currency: string;
    };
    id: string;
    tenantId: string;
    createdAt: string;
    orderNo: string;
    lines: {
        id: string;
        skuId: string;
        quantity: number;
        unitPrice: {
            amount: number;
            currency: string;
        };
    }[];
    customerId?: string | null | undefined;
}>;
export type SalesOrder = z.infer<typeof SalesOrderSchema>;
/** 客户端只传 SKU 与数量，绝不接收金额；customerId 可选，传了则校验客户存在 */
export declare const CreateOrderRequestSchema: z.ZodObject<{
    customerId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    lines: z.ZodArray<z.ZodObject<{
        skuId: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        skuId: string;
        quantity: number;
    }, {
        skuId: string;
        quantity: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    lines: {
        skuId: string;
        quantity: number;
    }[];
    customerId?: string | null | undefined;
}, {
    lines: {
        skuId: string;
        quantity: number;
    }[];
    customerId?: string | null | undefined;
}>;
export type CreateOrderRequest = z.infer<typeof CreateOrderRequestSchema>;
export declare const SalesOrderPageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        orderNo: z.ZodString;
        /** 关联客户：可选可空，老数据仍能校验；建单时传了就存，不传为 null */
        customerId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodEnum<["draft", "confirmed", "paid", "fulfilled", "cancelled"]>;
        lines: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            skuId: z.ZodString;
            quantity: z.ZodNumber;
            /** 成交价由服务端定价服务写入 */
            unitPrice: z.ZodObject<{
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
            skuId: string;
            quantity: number;
            unitPrice: {
                amount: number;
                currency: string;
            };
        }, {
            id: string;
            skuId: string;
            quantity: number;
            unitPrice: {
                amount: number;
                currency: string;
            };
        }>, "many">;
        total: z.ZodObject<{
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
        status: "draft" | "confirmed" | "paid" | "fulfilled" | "cancelled";
        total: {
            amount: number;
            currency: string;
        };
        id: string;
        tenantId: string;
        createdAt: string;
        orderNo: string;
        lines: {
            id: string;
            skuId: string;
            quantity: number;
            unitPrice: {
                amount: number;
                currency: string;
            };
        }[];
        customerId?: string | null | undefined;
    }, {
        status: "draft" | "confirmed" | "paid" | "fulfilled" | "cancelled";
        total: {
            amount: number;
            currency: string;
        };
        id: string;
        tenantId: string;
        createdAt: string;
        orderNo: string;
        lines: {
            id: string;
            skuId: string;
            quantity: number;
            unitPrice: {
                amount: number;
                currency: string;
            };
        }[];
        customerId?: string | null | undefined;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        status: "draft" | "confirmed" | "paid" | "fulfilled" | "cancelled";
        total: {
            amount: number;
            currency: string;
        };
        id: string;
        tenantId: string;
        createdAt: string;
        orderNo: string;
        lines: {
            id: string;
            skuId: string;
            quantity: number;
            unitPrice: {
                amount: number;
                currency: string;
            };
        }[];
        customerId?: string | null | undefined;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        status: "draft" | "confirmed" | "paid" | "fulfilled" | "cancelled";
        total: {
            amount: number;
            currency: string;
        };
        id: string;
        tenantId: string;
        createdAt: string;
        orderNo: string;
        lines: {
            id: string;
            skuId: string;
            quantity: number;
            unitPrice: {
                amount: number;
                currency: string;
            };
        }[];
        customerId?: string | null | undefined;
    }[];
    total: number;
}>;
export type SalesOrderPage = z.infer<typeof SalesOrderPageSchema>;
