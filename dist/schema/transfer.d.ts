import { z } from 'zod';
/** 调拨：draft -> completed；draft -> cancelled */
export declare const TransferStatusSchema: z.ZodEnum<["draft", "completed", "cancelled"]>;
export type TransferStatus = z.infer<typeof TransferStatusSchema>;
/** 显式状态机：终态不可回退，照抄退货单的做法 */
export declare const TRANSFER_TRANSITIONS: Record<TransferStatus, readonly TransferStatus[]>;
/** 调拨单：在两个仓库/库位之间移动一个 SKU 的库存，数量从源批次扣、往目标批次加 */
export declare const TransferSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    transferNo: z.ZodString;
    skuId: z.ZodString;
    fromLocation: z.ZodString;
    toLocation: z.ZodString;
    quantity: z.ZodNumber;
    status: z.ZodEnum<["draft", "completed", "cancelled"]>;
    /** 完成时实际动用的源批次号（FIFO 取批），draft 为 null；流水凭此定位批次 */
    batchCode: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    completedAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "cancelled" | "completed";
    id: string;
    tenantId: string;
    skuId: string;
    batchCode: string | null;
    quantity: number;
    createdAt: string;
    transferNo: string;
    fromLocation: string;
    toLocation: string;
    completedAt: string | null;
}, {
    status: "draft" | "cancelled" | "completed";
    id: string;
    tenantId: string;
    skuId: string;
    batchCode: string | null;
    quantity: number;
    createdAt: string;
    transferNo: string;
    fromLocation: string;
    toLocation: string;
    completedAt: string | null;
}>;
export type Transfer = z.infer<typeof TransferSchema>;
export declare const CreateTransferRequestSchema: z.ZodObject<{
    skuId: z.ZodString;
    fromLocation: z.ZodString;
    toLocation: z.ZodString;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    skuId: string;
    quantity: number;
    fromLocation: string;
    toLocation: string;
}, {
    skuId: string;
    quantity: number;
    fromLocation: string;
    toLocation: string;
}>;
export type CreateTransferRequest = z.infer<typeof CreateTransferRequestSchema>;
export declare const TransferPageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        transferNo: z.ZodString;
        skuId: z.ZodString;
        fromLocation: z.ZodString;
        toLocation: z.ZodString;
        quantity: z.ZodNumber;
        status: z.ZodEnum<["draft", "completed", "cancelled"]>;
        /** 完成时实际动用的源批次号（FIFO 取批），draft 为 null；流水凭此定位批次 */
        batchCode: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        completedAt: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "cancelled" | "completed";
        id: string;
        tenantId: string;
        skuId: string;
        batchCode: string | null;
        quantity: number;
        createdAt: string;
        transferNo: string;
        fromLocation: string;
        toLocation: string;
        completedAt: string | null;
    }, {
        status: "draft" | "cancelled" | "completed";
        id: string;
        tenantId: string;
        skuId: string;
        batchCode: string | null;
        quantity: number;
        createdAt: string;
        transferNo: string;
        fromLocation: string;
        toLocation: string;
        completedAt: string | null;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        status: "draft" | "cancelled" | "completed";
        id: string;
        tenantId: string;
        skuId: string;
        batchCode: string | null;
        quantity: number;
        createdAt: string;
        transferNo: string;
        fromLocation: string;
        toLocation: string;
        completedAt: string | null;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        status: "draft" | "cancelled" | "completed";
        id: string;
        tenantId: string;
        skuId: string;
        batchCode: string | null;
        quantity: number;
        createdAt: string;
        transferNo: string;
        fromLocation: string;
        toLocation: string;
        completedAt: string | null;
    }[];
    total: number;
}>;
export type TransferPage = z.infer<typeof TransferPageSchema>;
