import { z } from 'zod';
/** 采购入库单（GRN）：每次入库动作建一张，记录本次实际收到的行与批次 */
export declare const GoodsReceiptLineSchema: z.ZodObject<{
    id: z.ZodString;
    skuId: z.ZodString;
    quantity: z.ZodNumber;
    /** 本次入库进的批次（无批次时新建，batchCode = 采购单号；有批次时为既有批次） */
    batchCode: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    skuId: string;
    batchCode: string;
    quantity: number;
}, {
    id: string;
    skuId: string;
    batchCode: string;
    quantity: number;
}>;
export type GoodsReceiptLine = z.infer<typeof GoodsReceiptLineSchema>;
export declare const GoodsReceiptSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    receiptNo: z.ZodString;
    purchaseOrderId: z.ZodString;
    orderNo: z.ZodString;
    lines: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        skuId: z.ZodString;
        quantity: z.ZodNumber;
        /** 本次入库进的批次（无批次时新建，batchCode = 采购单号；有批次时为既有批次） */
        batchCode: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        skuId: string;
        batchCode: string;
        quantity: number;
    }, {
        id: string;
        skuId: string;
        batchCode: string;
        quantity: number;
    }>, "many">;
    receivedAt: z.ZodString;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    tenantId: string;
    createdAt: string;
    orderNo: string;
    lines: {
        id: string;
        skuId: string;
        batchCode: string;
        quantity: number;
    }[];
    receiptNo: string;
    purchaseOrderId: string;
    receivedAt: string;
}, {
    id: string;
    tenantId: string;
    createdAt: string;
    orderNo: string;
    lines: {
        id: string;
        skuId: string;
        batchCode: string;
        quantity: number;
    }[];
    receiptNo: string;
    purchaseOrderId: string;
    receivedAt: string;
}>;
export type GoodsReceipt = z.infer<typeof GoodsReceiptSchema>;
export declare const GoodsReceiptPageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        receiptNo: z.ZodString;
        purchaseOrderId: z.ZodString;
        orderNo: z.ZodString;
        lines: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            skuId: z.ZodString;
            quantity: z.ZodNumber;
            /** 本次入库进的批次（无批次时新建，batchCode = 采购单号；有批次时为既有批次） */
            batchCode: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            skuId: string;
            batchCode: string;
            quantity: number;
        }, {
            id: string;
            skuId: string;
            batchCode: string;
            quantity: number;
        }>, "many">;
        receivedAt: z.ZodString;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        tenantId: string;
        createdAt: string;
        orderNo: string;
        lines: {
            id: string;
            skuId: string;
            batchCode: string;
            quantity: number;
        }[];
        receiptNo: string;
        purchaseOrderId: string;
        receivedAt: string;
    }, {
        id: string;
        tenantId: string;
        createdAt: string;
        orderNo: string;
        lines: {
            id: string;
            skuId: string;
            batchCode: string;
            quantity: number;
        }[];
        receiptNo: string;
        purchaseOrderId: string;
        receivedAt: string;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        id: string;
        tenantId: string;
        createdAt: string;
        orderNo: string;
        lines: {
            id: string;
            skuId: string;
            batchCode: string;
            quantity: number;
        }[];
        receiptNo: string;
        purchaseOrderId: string;
        receivedAt: string;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        id: string;
        tenantId: string;
        createdAt: string;
        orderNo: string;
        lines: {
            id: string;
            skuId: string;
            batchCode: string;
            quantity: number;
        }[];
        receiptNo: string;
        purchaseOrderId: string;
        receivedAt: string;
    }[];
    total: number;
}>;
export type GoodsReceiptPage = z.infer<typeof GoodsReceiptPageSchema>;
export declare const GoodsReceiptListQuerySchema: z.ZodObject<{
    purchaseOrderId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    purchaseOrderId?: string | undefined;
}, {
    purchaseOrderId?: string | undefined;
}>;
export type GoodsReceiptListQuery = z.infer<typeof GoodsReceiptListQuerySchema>;
