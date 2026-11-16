import { z } from 'zod';
/** 盘点：draft -> confirmed；draft -> cancelled */
export declare const StocktakeStatusSchema: z.ZodEnum<["draft", "confirmed", "cancelled"]>;
export type StocktakeStatus = z.infer<typeof StocktakeStatusSchema>;
/** 显式状态机：终态不可回退，照抄退货单的做法 */
export declare const STOCKTAKE_TRANSITIONS: Record<StocktakeStatus, readonly StocktakeStatus[]>;
/**
 * 盘点单：针对单个批次实盘，systemQty 为建单时该批次 totalQty 的快照，
 * difference = countedQty - systemQty，由服务端算并存下来（不随后续库存变而变）
 */
export declare const StocktakeSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    stocktakeNo: z.ZodString;
    lotId: z.ZodString;
    skuId: z.ZodString;
    countedQty: z.ZodNumber;
    systemQty: z.ZodNumber;
    difference: z.ZodNumber;
    status: z.ZodEnum<["draft", "confirmed", "cancelled"]>;
    createdAt: z.ZodString;
    confirmedAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "confirmed" | "cancelled";
    id: string;
    tenantId: string;
    skuId: string;
    lotId: string;
    createdAt: string;
    stocktakeNo: string;
    countedQty: number;
    systemQty: number;
    difference: number;
    confirmedAt: string | null;
}, {
    status: "draft" | "confirmed" | "cancelled";
    id: string;
    tenantId: string;
    skuId: string;
    lotId: string;
    createdAt: string;
    stocktakeNo: string;
    countedQty: number;
    systemQty: number;
    difference: number;
    confirmedAt: string | null;
}>;
export type Stocktake = z.infer<typeof StocktakeSchema>;
export declare const CreateStocktakeRequestSchema: z.ZodObject<{
    lotId: z.ZodString;
    countedQty: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    lotId: string;
    countedQty: number;
}, {
    lotId: string;
    countedQty: number;
}>;
export type CreateStocktakeRequest = z.infer<typeof CreateStocktakeRequestSchema>;
export declare const StocktakePageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        stocktakeNo: z.ZodString;
        lotId: z.ZodString;
        skuId: z.ZodString;
        countedQty: z.ZodNumber;
        systemQty: z.ZodNumber;
        difference: z.ZodNumber;
        status: z.ZodEnum<["draft", "confirmed", "cancelled"]>;
        createdAt: z.ZodString;
        confirmedAt: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "confirmed" | "cancelled";
        id: string;
        tenantId: string;
        skuId: string;
        lotId: string;
        createdAt: string;
        stocktakeNo: string;
        countedQty: number;
        systemQty: number;
        difference: number;
        confirmedAt: string | null;
    }, {
        status: "draft" | "confirmed" | "cancelled";
        id: string;
        tenantId: string;
        skuId: string;
        lotId: string;
        createdAt: string;
        stocktakeNo: string;
        countedQty: number;
        systemQty: number;
        difference: number;
        confirmedAt: string | null;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        status: "draft" | "confirmed" | "cancelled";
        id: string;
        tenantId: string;
        skuId: string;
        lotId: string;
        createdAt: string;
        stocktakeNo: string;
        countedQty: number;
        systemQty: number;
        difference: number;
        confirmedAt: string | null;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        status: "draft" | "confirmed" | "cancelled";
        id: string;
        tenantId: string;
        skuId: string;
        lotId: string;
        createdAt: string;
        stocktakeNo: string;
        countedQty: number;
        systemQty: number;
        difference: number;
        confirmedAt: string | null;
    }[];
    total: number;
}>;
export type StocktakePage = z.infer<typeof StocktakePageSchema>;
