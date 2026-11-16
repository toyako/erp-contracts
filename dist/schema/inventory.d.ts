import { z } from 'zod';
/** 默认仓库：原型稿里的主仓；新批次（采购/RMA 入库）无指定仓库时落这里 */
export declare const DEFAULT_LOCATION = "\u4E3B\u4ED3";
export declare const InventoryLotSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    skuId: z.ZodString;
    batchCode: z.ZodString;
    /** 仓库/库位：批次归属的物理位置，调拨在不同位置间移动库存 */
    location: z.ZodString;
    /** 可被占用的数量 */
    availableQty: z.ZodNumber;
    /** 已下单未履约、不可再售的数量 */
    reservedQty: z.ZodNumber;
    totalQty: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    tenantId: string;
    skuId: string;
    batchCode: string;
    location: string;
    availableQty: number;
    reservedQty: number;
    totalQty: number;
}, {
    id: string;
    tenantId: string;
    skuId: string;
    batchCode: string;
    location: string;
    availableQty: number;
    reservedQty: number;
    totalQty: number;
}>;
export type InventoryLot = z.infer<typeof InventoryLotSchema>;
/** 占用只改状态不改总量，禁止用删除记录表示售出 */
export declare const ReserveStockRequestSchema: z.ZodObject<{
    skuId: z.ZodString;
    quantity: z.ZodNumber;
    orderId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    skuId: string;
    quantity: number;
    orderId: string;
}, {
    skuId: string;
    quantity: number;
    orderId: string;
}>;
export type ReserveStockRequest = z.infer<typeof ReserveStockRequestSchema>;
export declare const StockMovementSchema: z.ZodObject<{
    id: z.ZodString;
    lotId: z.ZodString;
    type: z.ZodEnum<["inbound", "reserve", "release", "outbound", "write_off"]>;
    quantity: z.ZodNumber;
    referenceId: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "inbound" | "reserve" | "release" | "outbound" | "write_off";
    id: string;
    quantity: number;
    lotId: string;
    createdAt: string;
    referenceId?: string | undefined;
}, {
    type: "inbound" | "reserve" | "release" | "outbound" | "write_off";
    id: string;
    quantity: number;
    lotId: string;
    createdAt: string;
    referenceId?: string | undefined;
}>;
export type StockMovement = z.infer<typeof StockMovementSchema>;
export declare const InventoryLotPageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        skuId: z.ZodString;
        batchCode: z.ZodString;
        /** 仓库/库位：批次归属的物理位置，调拨在不同位置间移动库存 */
        location: z.ZodString;
        /** 可被占用的数量 */
        availableQty: z.ZodNumber;
        /** 已下单未履约、不可再售的数量 */
        reservedQty: z.ZodNumber;
        totalQty: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        tenantId: string;
        skuId: string;
        batchCode: string;
        location: string;
        availableQty: number;
        reservedQty: number;
        totalQty: number;
    }, {
        id: string;
        tenantId: string;
        skuId: string;
        batchCode: string;
        location: string;
        availableQty: number;
        reservedQty: number;
        totalQty: number;
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
        skuId: string;
        batchCode: string;
        location: string;
        availableQty: number;
        reservedQty: number;
        totalQty: number;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        id: string;
        tenantId: string;
        skuId: string;
        batchCode: string;
        location: string;
        availableQty: number;
        reservedQty: number;
        totalQty: number;
    }[];
    total: number;
}>;
export type InventoryLotPage = z.infer<typeof InventoryLotPageSchema>;
