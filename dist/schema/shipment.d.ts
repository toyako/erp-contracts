import { z } from 'zod';
/** 发货单：draft -> picking -> packed -> shipped -> delivered；draft/picking/packed -> cancelled */
export declare const ShipmentStatusSchema: z.ZodEnum<["draft", "picking", "packed", "shipped", "delivered", "cancelled"]>;
export type ShipmentStatus = z.infer<typeof ShipmentStatusSchema>;
/** 显式状态机：终态不可回退，照抄退货单的做法 */
export declare const SHIPMENT_TRANSITIONS: Record<ShipmentStatus, readonly ShipmentStatus[]>;
export declare const ShipmentLineSchema: z.ZodObject<{
    skuId: z.ZodString;
    quantity: z.ZodNumber;
    /** 拣货时回填：履约扣数的同一批次（findLotBySku 的批次） */
    batchCode: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    skuId: string;
    batchCode: string | null;
    quantity: number;
}, {
    skuId: string;
    batchCode: string | null;
    quantity: number;
}>;
export type ShipmentLine = z.infer<typeof ShipmentLineSchema>;
/** 发货单：一单只针对一个销售订单，行照抄订单行 */
export declare const ShipmentSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    shipmentNo: z.ZodString;
    orderId: z.ZodString;
    orderNo: z.ZodString;
    status: z.ZodEnum<["draft", "picking", "packed", "shipped", "delivered", "cancelled"]>;
    lines: z.ZodArray<z.ZodObject<{
        skuId: z.ZodString;
        quantity: z.ZodNumber;
        /** 拣货时回填：履约扣数的同一批次（findLotBySku 的批次） */
        batchCode: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        skuId: string;
        batchCode: string | null;
        quantity: number;
    }, {
        skuId: string;
        batchCode: string | null;
        quantity: number;
    }>, "many">;
    /** 承运商与物流单号：发货时必填 */
    carrier: z.ZodNullable<z.ZodString>;
    trackingNo: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    shippedAt: z.ZodNullable<z.ZodString>;
    deliveredAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "cancelled" | "picking" | "packed" | "shipped" | "delivered";
    id: string;
    tenantId: string;
    orderId: string;
    createdAt: string;
    orderNo: string;
    lines: {
        skuId: string;
        batchCode: string | null;
        quantity: number;
    }[];
    shipmentNo: string;
    carrier: string | null;
    trackingNo: string | null;
    shippedAt: string | null;
    deliveredAt: string | null;
}, {
    status: "draft" | "cancelled" | "picking" | "packed" | "shipped" | "delivered";
    id: string;
    tenantId: string;
    orderId: string;
    createdAt: string;
    orderNo: string;
    lines: {
        skuId: string;
        batchCode: string | null;
        quantity: number;
    }[];
    shipmentNo: string;
    carrier: string | null;
    trackingNo: string | null;
    shippedAt: string | null;
    deliveredAt: string | null;
}>;
export type Shipment = z.infer<typeof ShipmentSchema>;
export declare const CreateShipmentRequestSchema: z.ZodObject<{
    orderId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    orderId: string;
}, {
    orderId: string;
}>;
export type CreateShipmentRequest = z.infer<typeof CreateShipmentRequestSchema>;
/** 发货：承运商与物流单号必填 */
export declare const ShipShipmentRequestSchema: z.ZodObject<{
    carrier: z.ZodString;
    trackingNo: z.ZodString;
}, "strip", z.ZodTypeAny, {
    carrier: string;
    trackingNo: string;
}, {
    carrier: string;
    trackingNo: string;
}>;
export type ShipShipmentRequest = z.infer<typeof ShipShipmentRequestSchema>;
export declare const ShipmentPageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        shipmentNo: z.ZodString;
        orderId: z.ZodString;
        orderNo: z.ZodString;
        status: z.ZodEnum<["draft", "picking", "packed", "shipped", "delivered", "cancelled"]>;
        lines: z.ZodArray<z.ZodObject<{
            skuId: z.ZodString;
            quantity: z.ZodNumber;
            /** 拣货时回填：履约扣数的同一批次（findLotBySku 的批次） */
            batchCode: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            skuId: string;
            batchCode: string | null;
            quantity: number;
        }, {
            skuId: string;
            batchCode: string | null;
            quantity: number;
        }>, "many">;
        /** 承运商与物流单号：发货时必填 */
        carrier: z.ZodNullable<z.ZodString>;
        trackingNo: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        shippedAt: z.ZodNullable<z.ZodString>;
        deliveredAt: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "cancelled" | "picking" | "packed" | "shipped" | "delivered";
        id: string;
        tenantId: string;
        orderId: string;
        createdAt: string;
        orderNo: string;
        lines: {
            skuId: string;
            batchCode: string | null;
            quantity: number;
        }[];
        shipmentNo: string;
        carrier: string | null;
        trackingNo: string | null;
        shippedAt: string | null;
        deliveredAt: string | null;
    }, {
        status: "draft" | "cancelled" | "picking" | "packed" | "shipped" | "delivered";
        id: string;
        tenantId: string;
        orderId: string;
        createdAt: string;
        orderNo: string;
        lines: {
            skuId: string;
            batchCode: string | null;
            quantity: number;
        }[];
        shipmentNo: string;
        carrier: string | null;
        trackingNo: string | null;
        shippedAt: string | null;
        deliveredAt: string | null;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        status: "draft" | "cancelled" | "picking" | "packed" | "shipped" | "delivered";
        id: string;
        tenantId: string;
        orderId: string;
        createdAt: string;
        orderNo: string;
        lines: {
            skuId: string;
            batchCode: string | null;
            quantity: number;
        }[];
        shipmentNo: string;
        carrier: string | null;
        trackingNo: string | null;
        shippedAt: string | null;
        deliveredAt: string | null;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        status: "draft" | "cancelled" | "picking" | "packed" | "shipped" | "delivered";
        id: string;
        tenantId: string;
        orderId: string;
        createdAt: string;
        orderNo: string;
        lines: {
            skuId: string;
            batchCode: string | null;
            quantity: number;
        }[];
        shipmentNo: string;
        carrier: string | null;
        trackingNo: string | null;
        shippedAt: string | null;
        deliveredAt: string | null;
    }[];
    total: number;
}>;
export type ShipmentPage = z.infer<typeof ShipmentPageSchema>;
