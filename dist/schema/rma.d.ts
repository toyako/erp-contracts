import { z } from 'zod';
/** 售后退货：requested -> approved -> received -> refunded；requested -> rejected；requested/approved -> cancelled */
export declare const RmaStatusSchema: z.ZodEnum<["requested", "approved", "rejected", "received", "refunded", "cancelled"]>;
export type RmaStatus = z.infer<typeof RmaStatusSchema>;
/** 显式状态机：终态不可回退，照抄采购订单的做法 */
export declare const RMA_TRANSITIONS: Record<RmaStatus, readonly RmaStatus[]>;
/** 退货单：一单只针对一个订单里一个 SKU 的数量，多 SKU 分多单申请 */
export declare const RmaSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    rmaNo: z.ZodString;
    orderId: z.ZodString;
    skuId: z.ZodString;
    quantity: z.ZodNumber;
    reason: z.ZodString;
    status: z.ZodEnum<["requested", "approved", "rejected", "received", "refunded", "cancelled"]>;
    /** 退款金额由服务端按行单价 × 数量算，客户端不传金额 */
    refundAmount: z.ZodObject<{
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
    receivedAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "received" | "cancelled" | "requested" | "approved" | "rejected" | "refunded";
    id: string;
    tenantId: string;
    skuId: string;
    quantity: number;
    orderId: string;
    createdAt: string;
    rmaNo: string;
    reason: string;
    refundAmount: {
        amount: number;
        currency: string;
    };
    receivedAt: string | null;
}, {
    status: "received" | "cancelled" | "requested" | "approved" | "rejected" | "refunded";
    id: string;
    tenantId: string;
    skuId: string;
    quantity: number;
    orderId: string;
    createdAt: string;
    rmaNo: string;
    reason: string;
    refundAmount: {
        amount: number;
        currency: string;
    };
    receivedAt: string | null;
}>;
export type Rma = z.infer<typeof RmaSchema>;
export declare const CreateRmaRequestSchema: z.ZodObject<{
    orderId: z.ZodString;
    skuId: z.ZodString;
    quantity: z.ZodNumber;
    reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    skuId: string;
    quantity: number;
    orderId: string;
    reason: string;
}, {
    skuId: string;
    quantity: number;
    orderId: string;
    reason: string;
}>;
export type CreateRmaRequest = z.infer<typeof CreateRmaRequestSchema>;
export declare const RmaPageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        rmaNo: z.ZodString;
        orderId: z.ZodString;
        skuId: z.ZodString;
        quantity: z.ZodNumber;
        reason: z.ZodString;
        status: z.ZodEnum<["requested", "approved", "rejected", "received", "refunded", "cancelled"]>;
        /** 退款金额由服务端按行单价 × 数量算，客户端不传金额 */
        refundAmount: z.ZodObject<{
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
        receivedAt: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "received" | "cancelled" | "requested" | "approved" | "rejected" | "refunded";
        id: string;
        tenantId: string;
        skuId: string;
        quantity: number;
        orderId: string;
        createdAt: string;
        rmaNo: string;
        reason: string;
        refundAmount: {
            amount: number;
            currency: string;
        };
        receivedAt: string | null;
    }, {
        status: "received" | "cancelled" | "requested" | "approved" | "rejected" | "refunded";
        id: string;
        tenantId: string;
        skuId: string;
        quantity: number;
        orderId: string;
        createdAt: string;
        rmaNo: string;
        reason: string;
        refundAmount: {
            amount: number;
            currency: string;
        };
        receivedAt: string | null;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        status: "received" | "cancelled" | "requested" | "approved" | "rejected" | "refunded";
        id: string;
        tenantId: string;
        skuId: string;
        quantity: number;
        orderId: string;
        createdAt: string;
        rmaNo: string;
        reason: string;
        refundAmount: {
            amount: number;
            currency: string;
        };
        receivedAt: string | null;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        status: "received" | "cancelled" | "requested" | "approved" | "rejected" | "refunded";
        id: string;
        tenantId: string;
        skuId: string;
        quantity: number;
        orderId: string;
        createdAt: string;
        rmaNo: string;
        reason: string;
        refundAmount: {
            amount: number;
            currency: string;
        };
        receivedAt: string | null;
    }[];
    total: number;
}>;
export type RmaPage = z.infer<typeof RmaPageSchema>;
