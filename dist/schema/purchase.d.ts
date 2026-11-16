import { z } from 'zod';
/** 供应商（采购上下文） */
export declare const SupplierSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    code: z.ZodString;
    name: z.ZodString;
    contact: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    rating: z.ZodNumber;
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    code: string;
    id: string;
    tenantId: string;
    name: string;
    enabled: boolean;
    rating: number;
    contact?: string | undefined;
    phone?: string | undefined;
}, {
    code: string;
    id: string;
    tenantId: string;
    name: string;
    enabled: boolean;
    rating: number;
    contact?: string | undefined;
    phone?: string | undefined;
}>;
export type Supplier = z.infer<typeof SupplierSchema>;
export declare const CreateSupplierRequestSchema: z.ZodObject<{
    code: z.ZodString;
    name: z.ZodString;
    contact: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    rating: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    code: string;
    name: string;
    rating: number;
    contact?: string | undefined;
    phone?: string | undefined;
}, {
    code: string;
    name: string;
    contact?: string | undefined;
    phone?: string | undefined;
    rating?: number | undefined;
}>;
export type CreateSupplierRequest = z.infer<typeof CreateSupplierRequestSchema>;
/** 供应商编辑：只传要改的字段，编码不可改 */
export declare const UpdateSupplierRequestSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    contact: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    rating: z.ZodOptional<z.ZodNumber>;
    enabled: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    enabled?: boolean | undefined;
    contact?: string | undefined;
    phone?: string | undefined;
    rating?: number | undefined;
}, {
    name?: string | undefined;
    enabled?: boolean | undefined;
    contact?: string | undefined;
    phone?: string | undefined;
    rating?: number | undefined;
}>;
export type UpdateSupplierRequest = z.infer<typeof UpdateSupplierRequestSchema>;
/** 采购订单：draft -> submitted（待审核） -> approved（已审核） -> received / 部分入库 / cancelled；驳回为终态 */
export declare const PurchaseOrderStatusSchema: z.ZodEnum<["draft", "submitted", "approved", "partially_received", "received", "rejected", "cancelled"]>;
export type PurchaseOrderStatus = z.infer<typeof PurchaseOrderStatusSchema>;
/** 显式状态机：终态不可回退，照抄销售订单的做法；rejected 沿用退货单/调拨单的终态口径 */
export declare const PURCHASE_ORDER_TRANSITIONS: Record<PurchaseOrderStatus, readonly PurchaseOrderStatus[]>;
export declare const PurchaseOrderLineSchema: z.ZodObject<{
    id: z.ZodString;
    skuId: z.ZodString;
    quantity: z.ZodNumber;
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
    /** 已收数量（分批入库累加），默认 0 */
    receivedQty: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    skuId: string;
    quantity: number;
    unitPrice: {
        amount: number;
        currency: string;
    };
    receivedQty: number;
}, {
    id: string;
    skuId: string;
    quantity: number;
    unitPrice: {
        amount: number;
        currency: string;
    };
    receivedQty: number;
}>;
export type PurchaseOrderLine = z.infer<typeof PurchaseOrderLineSchema>;
export declare const PurchaseOrderSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    orderNo: z.ZodString;
    supplierId: z.ZodString;
    status: z.ZodEnum<["draft", "submitted", "approved", "partially_received", "received", "rejected", "cancelled"]>;
    lines: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        skuId: z.ZodString;
        quantity: z.ZodNumber;
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
        /** 已收数量（分批入库累加），默认 0 */
        receivedQty: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        skuId: string;
        quantity: number;
        unitPrice: {
            amount: number;
            currency: string;
        };
        receivedQty: number;
    }, {
        id: string;
        skuId: string;
        quantity: number;
        unitPrice: {
            amount: number;
            currency: string;
        };
        receivedQty: number;
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
    /** 驳回原因（仅 rejected 时有值） */
    rejectReason: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "received" | "draft" | "cancelled" | "submitted" | "approved" | "partially_received" | "rejected";
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
        receivedQty: number;
    }[];
    supplierId: string;
    rejectReason: string | null;
}, {
    status: "received" | "draft" | "cancelled" | "submitted" | "approved" | "partially_received" | "rejected";
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
        receivedQty: number;
    }[];
    supplierId: string;
    rejectReason: string | null;
}>;
export type PurchaseOrder = z.infer<typeof PurchaseOrderSchema>;
export declare const CreatePurchaseOrderRequestSchema: z.ZodObject<{
    supplierId: z.ZodString;
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
    supplierId: string;
}, {
    lines: {
        skuId: string;
        quantity: number;
    }[];
    supplierId: string;
}>;
export type CreatePurchaseOrderRequest = z.infer<typeof CreatePurchaseOrderRequestSchema>;
export declare const PurchaseOrderPageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        orderNo: z.ZodString;
        supplierId: z.ZodString;
        status: z.ZodEnum<["draft", "submitted", "approved", "partially_received", "received", "rejected", "cancelled"]>;
        lines: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            skuId: z.ZodString;
            quantity: z.ZodNumber;
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
            /** 已收数量（分批入库累加），默认 0 */
            receivedQty: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            skuId: string;
            quantity: number;
            unitPrice: {
                amount: number;
                currency: string;
            };
            receivedQty: number;
        }, {
            id: string;
            skuId: string;
            quantity: number;
            unitPrice: {
                amount: number;
                currency: string;
            };
            receivedQty: number;
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
        /** 驳回原因（仅 rejected 时有值） */
        rejectReason: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "received" | "draft" | "cancelled" | "submitted" | "approved" | "partially_received" | "rejected";
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
            receivedQty: number;
        }[];
        supplierId: string;
        rejectReason: string | null;
    }, {
        status: "received" | "draft" | "cancelled" | "submitted" | "approved" | "partially_received" | "rejected";
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
            receivedQty: number;
        }[];
        supplierId: string;
        rejectReason: string | null;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        status: "received" | "draft" | "cancelled" | "submitted" | "approved" | "partially_received" | "rejected";
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
            receivedQty: number;
        }[];
        supplierId: string;
        rejectReason: string | null;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        status: "received" | "draft" | "cancelled" | "submitted" | "approved" | "partially_received" | "rejected";
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
            receivedQty: number;
        }[];
        supplierId: string;
        rejectReason: string | null;
    }[];
    total: number;
}>;
export type PurchaseOrderPage = z.infer<typeof PurchaseOrderPageSchema>;
/** 驳回请求：原因必填（空原因 400），沿用退货单拒绝原因的做法 */
export declare const RejectPurchaseOrderRequestSchema: z.ZodObject<{
    reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reason: string;
}, {
    reason: string;
}>;
export type RejectPurchaseOrderRequest = z.infer<typeof RejectPurchaseOrderRequestSchema>;
/**
 * 入库请求：lines 缺省 = 整单收完（老行为，兼容冒烟与旧调用）；
 * 传 lines = 按行收指定数量（每行须 >0 且 ≤ 剩余量）。
 * 整个 body 可缺省（空 body 解析为 {}，即整单收完）。
 */
export declare const ReceivePurchaseOrderRequestSchema: z.ZodDefault<z.ZodObject<{
    lines: z.ZodOptional<z.ZodArray<z.ZodObject<{
        skuId: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        skuId: string;
        quantity: number;
    }, {
        skuId: string;
        quantity: number;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    lines?: {
        skuId: string;
        quantity: number;
    }[] | undefined;
}, {
    lines?: {
        skuId: string;
        quantity: number;
    }[] | undefined;
}>>;
export type ReceivePurchaseOrderRequest = z.infer<typeof ReceivePurchaseOrderRequestSchema>;
