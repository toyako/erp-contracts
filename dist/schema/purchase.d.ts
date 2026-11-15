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
/** 采购订单：draft -> submitted -> received / cancelled */
export declare const PurchaseOrderStatusSchema: z.ZodEnum<["draft", "submitted", "received", "cancelled"]>;
export type PurchaseOrderStatus = z.infer<typeof PurchaseOrderStatusSchema>;
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
export type PurchaseOrderLine = z.infer<typeof PurchaseOrderLineSchema>;
export declare const PurchaseOrderSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    orderNo: z.ZodString;
    supplierId: z.ZodString;
    status: z.ZodEnum<["draft", "submitted", "received", "cancelled"]>;
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
    status: "received" | "draft" | "cancelled" | "submitted";
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
    supplierId: string;
}, {
    status: "received" | "draft" | "cancelled" | "submitted";
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
    supplierId: string;
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
