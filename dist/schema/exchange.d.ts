import { z } from 'zod';
/** 换货：requested -> approved -> received -> exchanged；requested -> rejected；requested/approved/received -> cancelled */
export declare const ExchangeStatusSchema: z.ZodEnum<["requested", "approved", "rejected", "received", "exchanged", "cancelled"]>;
export type ExchangeStatus = z.infer<typeof ExchangeStatusSchema>;
/** 显式状态机：终态不可回退，照抄退货单的做法 */
export declare const EXCHANGE_TRANSITIONS: Record<ExchangeStatus, readonly ExchangeStatus[]>;
/** 换货单：一次换货只针对一个订单里一个退货 SKU + 一个换入 SKU 的数量，多 SKU 分多单申请 */
export declare const ExchangeSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    exchangeNo: z.ZodString;
    orderId: z.ZodString;
    returnSkuId: z.ZodString;
    returnQty: z.ZodNumber;
    exchangeSkuId: z.ZodString;
    exchangeQty: z.ZodNumber;
    /** 差价由服务端按“换入价 − 退货价”算：正数=客户补差价，负数=应退差价；只记数，不走真实支付 */
    diffAmount: z.ZodNullable<z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>>;
    status: z.ZodEnum<["requested", "approved", "rejected", "received", "exchanged", "cancelled"]>;
    /** 拒绝原因：仅 rejected 状态下有值，由审核人在拒绝时填写 */
    rejectReason: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    receivedAt: z.ZodNullable<z.ZodString>;
    exchangedAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "received" | "cancelled" | "approved" | "rejected" | "requested" | "exchanged";
    id: string;
    tenantId: string;
    orderId: string;
    createdAt: string;
    rejectReason: string | null;
    receivedAt: string | null;
    exchangeNo: string;
    returnSkuId: string;
    returnQty: number;
    exchangeSkuId: string;
    exchangeQty: number;
    diffAmount: {
        amount: number;
        currency: string;
    } | null;
    exchangedAt: string | null;
}, {
    status: "received" | "cancelled" | "approved" | "rejected" | "requested" | "exchanged";
    id: string;
    tenantId: string;
    orderId: string;
    createdAt: string;
    rejectReason: string | null;
    receivedAt: string | null;
    exchangeNo: string;
    returnSkuId: string;
    returnQty: number;
    exchangeSkuId: string;
    exchangeQty: number;
    diffAmount: {
        amount: number;
        currency: string;
    } | null;
    exchangedAt: string | null;
}>;
export type Exchange = z.infer<typeof ExchangeSchema>;
/** 拒绝换货：原因必填（1–200 字），落库到 rejectReason */
export declare const RejectExchangeRequestSchema: z.ZodObject<{
    reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reason: string;
}, {
    reason: string;
}>;
export type RejectExchangeRequest = z.infer<typeof RejectExchangeRequestSchema>;
export declare const CreateExchangeRequestSchema: z.ZodObject<{
    orderId: z.ZodString;
    returnSkuId: z.ZodString;
    returnQty: z.ZodNumber;
    exchangeSkuId: z.ZodString;
    exchangeQty: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    orderId: string;
    returnSkuId: string;
    returnQty: number;
    exchangeSkuId: string;
    exchangeQty: number;
}, {
    orderId: string;
    returnSkuId: string;
    returnQty: number;
    exchangeSkuId: string;
    exchangeQty: number;
}>;
export type CreateExchangeRequest = z.infer<typeof CreateExchangeRequestSchema>;
export declare const ExchangePageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        exchangeNo: z.ZodString;
        orderId: z.ZodString;
        returnSkuId: z.ZodString;
        returnQty: z.ZodNumber;
        exchangeSkuId: z.ZodString;
        exchangeQty: z.ZodNumber;
        /** 差价由服务端按“换入价 − 退货价”算：正数=客户补差价，负数=应退差价；只记数，不走真实支付 */
        diffAmount: z.ZodNullable<z.ZodObject<{
            amount: z.ZodNumber;
            currency: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            amount: number;
            currency: string;
        }, {
            amount: number;
            currency: string;
        }>>;
        status: z.ZodEnum<["requested", "approved", "rejected", "received", "exchanged", "cancelled"]>;
        /** 拒绝原因：仅 rejected 状态下有值，由审核人在拒绝时填写 */
        rejectReason: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        receivedAt: z.ZodNullable<z.ZodString>;
        exchangedAt: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "received" | "cancelled" | "approved" | "rejected" | "requested" | "exchanged";
        id: string;
        tenantId: string;
        orderId: string;
        createdAt: string;
        rejectReason: string | null;
        receivedAt: string | null;
        exchangeNo: string;
        returnSkuId: string;
        returnQty: number;
        exchangeSkuId: string;
        exchangeQty: number;
        diffAmount: {
            amount: number;
            currency: string;
        } | null;
        exchangedAt: string | null;
    }, {
        status: "received" | "cancelled" | "approved" | "rejected" | "requested" | "exchanged";
        id: string;
        tenantId: string;
        orderId: string;
        createdAt: string;
        rejectReason: string | null;
        receivedAt: string | null;
        exchangeNo: string;
        returnSkuId: string;
        returnQty: number;
        exchangeSkuId: string;
        exchangeQty: number;
        diffAmount: {
            amount: number;
            currency: string;
        } | null;
        exchangedAt: string | null;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        status: "received" | "cancelled" | "approved" | "rejected" | "requested" | "exchanged";
        id: string;
        tenantId: string;
        orderId: string;
        createdAt: string;
        rejectReason: string | null;
        receivedAt: string | null;
        exchangeNo: string;
        returnSkuId: string;
        returnQty: number;
        exchangeSkuId: string;
        exchangeQty: number;
        diffAmount: {
            amount: number;
            currency: string;
        } | null;
        exchangedAt: string | null;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        status: "received" | "cancelled" | "approved" | "rejected" | "requested" | "exchanged";
        id: string;
        tenantId: string;
        orderId: string;
        createdAt: string;
        rejectReason: string | null;
        receivedAt: string | null;
        exchangeNo: string;
        returnSkuId: string;
        returnQty: number;
        exchangeSkuId: string;
        exchangeQty: number;
        diffAmount: {
            amount: number;
            currency: string;
        } | null;
        exchangedAt: string | null;
    }[];
    total: number;
}>;
export type ExchangePage = z.infer<typeof ExchangePageSchema>;
