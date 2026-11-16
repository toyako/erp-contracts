import { z } from 'zod';
/** 调拨：draft -> submitted -> approved -> completed；提交后可拒绝/取消；rejected 为终态 */
export declare const TransferStatusSchema: z.ZodEnum<["draft", "submitted", "approved", "rejected", "completed", "cancelled"]>;
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
    status: z.ZodEnum<["draft", "submitted", "approved", "rejected", "completed", "cancelled"]>;
    /** 完成时实际动用的源批次号（FIFO 取批），draft 为 null；流水凭此定位批次 */
    batchCode: z.ZodNullable<z.ZodString>;
    /** 拒绝原因：仅 rejected 状态下有值，由审核人在拒绝时填写 */
    rejectReason: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    completedAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "cancelled" | "submitted" | "approved" | "rejected" | "completed";
    id: string;
    tenantId: string;
    skuId: string;
    batchCode: string | null;
    quantity: number;
    createdAt: string;
    rejectReason: string | null;
    transferNo: string;
    fromLocation: string;
    toLocation: string;
    completedAt: string | null;
}, {
    status: "draft" | "cancelled" | "submitted" | "approved" | "rejected" | "completed";
    id: string;
    tenantId: string;
    skuId: string;
    batchCode: string | null;
    quantity: number;
    createdAt: string;
    rejectReason: string | null;
    transferNo: string;
    fromLocation: string;
    toLocation: string;
    completedAt: string | null;
}>;
export type Transfer = z.infer<typeof TransferSchema>;
/** 拒绝调拨：原因必填（1–200 字），落库到 rejectReason */
export declare const RejectTransferRequestSchema: z.ZodObject<{
    reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reason: string;
}, {
    reason: string;
}>;
export type RejectTransferRequest = z.infer<typeof RejectTransferRequestSchema>;
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
        status: z.ZodEnum<["draft", "submitted", "approved", "rejected", "completed", "cancelled"]>;
        /** 完成时实际动用的源批次号（FIFO 取批），draft 为 null；流水凭此定位批次 */
        batchCode: z.ZodNullable<z.ZodString>;
        /** 拒绝原因：仅 rejected 状态下有值，由审核人在拒绝时填写 */
        rejectReason: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        completedAt: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "cancelled" | "submitted" | "approved" | "rejected" | "completed";
        id: string;
        tenantId: string;
        skuId: string;
        batchCode: string | null;
        quantity: number;
        createdAt: string;
        rejectReason: string | null;
        transferNo: string;
        fromLocation: string;
        toLocation: string;
        completedAt: string | null;
    }, {
        status: "draft" | "cancelled" | "submitted" | "approved" | "rejected" | "completed";
        id: string;
        tenantId: string;
        skuId: string;
        batchCode: string | null;
        quantity: number;
        createdAt: string;
        rejectReason: string | null;
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
        status: "draft" | "cancelled" | "submitted" | "approved" | "rejected" | "completed";
        id: string;
        tenantId: string;
        skuId: string;
        batchCode: string | null;
        quantity: number;
        createdAt: string;
        rejectReason: string | null;
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
        status: "draft" | "cancelled" | "submitted" | "approved" | "rejected" | "completed";
        id: string;
        tenantId: string;
        skuId: string;
        batchCode: string | null;
        quantity: number;
        createdAt: string;
        rejectReason: string | null;
        transferNo: string;
        fromLocation: string;
        toLocation: string;
        completedAt: string | null;
    }[];
    total: number;
}>;
export type TransferPage = z.infer<typeof TransferPageSchema>;
