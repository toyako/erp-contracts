import { z } from 'zod';
/**
 * 仪表盘汇总契约：聚合页（经营概览 / 报表 / 待办 / 应收应付 / 设置日志 / 库存流水）
 * 不再从列表接口拉全量 pageSize: 200 后在前端聚合，统一走服务端汇总。
 * 金额一律以“分”为单位的非负整数。
 */
export declare const ReportRangeSchema: z.ZodEnum<["7d", "30d", "month"]>;
export type ReportRange = z.infer<typeof ReportRangeSchema>;
/** GET /dashboard/report 的 query：range 缺省为 7d */
export declare const ReportQuerySchema: z.ZodObject<{
    range: z.ZodDefault<z.ZodEnum<["7d", "30d", "month"]>>;
}, "strip", z.ZodTypeAny, {
    range: "7d" | "30d" | "month";
}, {
    range?: "7d" | "30d" | "month" | undefined;
}>;
export type ReportQuery = z.infer<typeof ReportQuerySchema>;
export declare const OverviewSummarySchema: z.ZodObject<{
    /** 全部订单 total.amount 之和（含已取消），单位：分 */
    salesAmount: z.ZodNumber;
    orderCount: z.ZodNumber;
    fulfilledCount: z.ZodNumber;
    availableStock: z.ZodNumber;
    reservedStock: z.ZodNumber;
    /** 可用量 < 20 的批次数 */
    warningCount: z.ZodNumber;
    statusDist: z.ZodArray<z.ZodObject<{
        status: z.ZodEnum<["draft", "confirmed", "paid", "fulfilled", "cancelled"]>;
        count: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "confirmed" | "paid" | "fulfilled" | "cancelled";
        count: number;
    }, {
        status: "draft" | "confirmed" | "paid" | "fulfilled" | "cancelled";
        count: number;
    }>, "many">;
    /** 近 7 个自然日（服务端 UTC 日），date 为 YYYY-MM-DD */
    trend7: z.ZodArray<z.ZodObject<{
        date: z.ZodString;
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        date: string;
    }, {
        amount: number;
        date: string;
    }>, "many">;
    /** 近 30 个自然日（与 trend7 同口径，供概览趋势图切换） */
    trend30: z.ZodArray<z.ZodObject<{
        date: z.ZodString;
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        date: string;
    }, {
        amount: number;
        date: string;
    }>, "many">;
    /** 按订单行数量取前 5；SKU 缺失时 code 为 skuId 前 8 位、spec 为空串 */
    ranking: z.ZodArray<z.ZodObject<{
        skuId: z.ZodString;
        code: z.ZodString;
        spec: z.ZodString;
        qty: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        code: string;
        spec: string;
        skuId: string;
        qty: number;
    }, {
        code: string;
        spec: string;
        skuId: string;
        qty: number;
    }>, "many">;
    /** 批次按 availableQty 升序取前 4；SKU 缺失时 skuCode 为 '—' */
    lowStock: z.ZodArray<z.ZodObject<{
        batchCode: z.ZodString;
        skuCode: z.ZodString;
        availableQty: z.ZodNumber;
        reservedQty: z.ZodNumber;
        totalQty: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        batchCode: string;
        availableQty: number;
        reservedQty: number;
        totalQty: number;
        skuCode: string;
    }, {
        batchCode: string;
        availableQty: number;
        reservedQty: number;
        totalQty: number;
        skuCode: string;
    }>, "many">;
    /** 按 code 升序第一个 SKU，无 SKU 时为 null */
    firstSku: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        code: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: string;
        id: string;
    }, {
        code: string;
        id: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    salesAmount: number;
    orderCount: number;
    fulfilledCount: number;
    availableStock: number;
    reservedStock: number;
    warningCount: number;
    statusDist: {
        status: "draft" | "confirmed" | "paid" | "fulfilled" | "cancelled";
        count: number;
    }[];
    trend7: {
        amount: number;
        date: string;
    }[];
    trend30: {
        amount: number;
        date: string;
    }[];
    ranking: {
        code: string;
        spec: string;
        skuId: string;
        qty: number;
    }[];
    lowStock: {
        batchCode: string;
        availableQty: number;
        reservedQty: number;
        totalQty: number;
        skuCode: string;
    }[];
    firstSku: {
        code: string;
        id: string;
    } | null;
}, {
    salesAmount: number;
    orderCount: number;
    fulfilledCount: number;
    availableStock: number;
    reservedStock: number;
    warningCount: number;
    statusDist: {
        status: "draft" | "confirmed" | "paid" | "fulfilled" | "cancelled";
        count: number;
    }[];
    trend7: {
        amount: number;
        date: string;
    }[];
    trend30: {
        amount: number;
        date: string;
    }[];
    ranking: {
        code: string;
        spec: string;
        skuId: string;
        qty: number;
    }[];
    lowStock: {
        batchCode: string;
        availableQty: number;
        reservedQty: number;
        totalQty: number;
        skuCode: string;
    }[];
    firstSku: {
        code: string;
        id: string;
    } | null;
}>;
export type OverviewSummary = z.infer<typeof OverviewSummarySchema>;
export declare const ReportSummarySchema: z.ZodObject<{
    range: z.ZodEnum<["7d", "30d", "month"]>;
    /** 6 个等长桶，label 为桶首日 M-D，amount 单位：分 */
    buckets: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        label: string;
    }, {
        amount: number;
        label: string;
    }>, "many">;
    /** 按 amount 降序；change 为数量相对上一区间的变化百分比，上一区间为 0 时为 null */
    ranking: z.ZodArray<z.ZodObject<{
        skuId: z.ZodString;
        code: z.ZodString;
        spec: z.ZodString;
        qty: z.ZodNumber;
        amount: z.ZodNumber;
        change: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        amount: number;
        spec: string;
        skuId: string;
        qty: number;
        change: number | null;
    }, {
        code: string;
        amount: number;
        spec: string;
        skuId: string;
        qty: number;
        change: number | null;
    }>, "many">;
    /** 全部 SKU：days 为库存周转天数（1 位小数），无销量时为 null；pct 相对最大 days */
    turnover: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        stock: z.ZodNumber;
        days: z.ZodNullable<z.ZodNumber>;
        pct: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        stock: number;
        days: number | null;
        pct: number;
    }, {
        name: string;
        stock: number;
        days: number | null;
        pct: number;
    }>, "many">;
    /** 区间内无销量的 SKU */
    slow: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        stock: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        stock: number;
    }, {
        name: string;
        stock: number;
    }>, "many">;
    /**
     * 毛利：按订单行算（销售额 = 行单价×数量，成本 = SKU 成本价×数量，只计非 cancelled 订单）。
     * cost/gross/marginRate 为 null 表示该 SKU 未维护成本价；汇总只计已维护成本的 SKU，
     * 全部未维护时 totalGross/marginRate 为 null；marginRate 为毛利率百分比（1 位小数）。
     */
    gross: z.ZodObject<{
        totalAmount: z.ZodNumber;
        totalCost: z.ZodNumber;
        totalGross: z.ZodNullable<z.ZodNumber>;
        marginRate: z.ZodNullable<z.ZodNumber>;
        rows: z.ZodArray<z.ZodObject<{
            skuId: z.ZodString;
            code: z.ZodString;
            spec: z.ZodString;
            qty: z.ZodNumber;
            amount: z.ZodNumber;
            cost: z.ZodNullable<z.ZodNumber>;
            gross: z.ZodNullable<z.ZodNumber>;
            marginRate: z.ZodNullable<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            code: string;
            amount: number;
            spec: string;
            cost: number | null;
            skuId: string;
            qty: number;
            gross: number | null;
            marginRate: number | null;
        }, {
            code: string;
            amount: number;
            spec: string;
            cost: number | null;
            skuId: string;
            qty: number;
            gross: number | null;
            marginRate: number | null;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        totalAmount: number;
        totalCost: number;
        totalGross: number | null;
        marginRate: number | null;
        rows: {
            code: string;
            amount: number;
            spec: string;
            cost: number | null;
            skuId: string;
            qty: number;
            gross: number | null;
            marginRate: number | null;
        }[];
    }, {
        totalAmount: number;
        totalCost: number;
        totalGross: number | null;
        marginRate: number | null;
        rows: {
            code: string;
            amount: number;
            spec: string;
            cost: number | null;
            skuId: string;
            qty: number;
            gross: number | null;
            marginRate: number | null;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    range: "7d" | "30d" | "month";
    ranking: {
        code: string;
        amount: number;
        spec: string;
        skuId: string;
        qty: number;
        change: number | null;
    }[];
    buckets: {
        amount: number;
        label: string;
    }[];
    turnover: {
        name: string;
        stock: number;
        days: number | null;
        pct: number;
    }[];
    slow: {
        name: string;
        stock: number;
    }[];
    gross: {
        totalAmount: number;
        totalCost: number;
        totalGross: number | null;
        marginRate: number | null;
        rows: {
            code: string;
            amount: number;
            spec: string;
            cost: number | null;
            skuId: string;
            qty: number;
            gross: number | null;
            marginRate: number | null;
        }[];
    };
}, {
    range: "7d" | "30d" | "month";
    ranking: {
        code: string;
        amount: number;
        spec: string;
        skuId: string;
        qty: number;
        change: number | null;
    }[];
    buckets: {
        amount: number;
        label: string;
    }[];
    turnover: {
        name: string;
        stock: number;
        days: number | null;
        pct: number;
    }[];
    slow: {
        name: string;
        stock: number;
    }[];
    gross: {
        totalAmount: number;
        totalCost: number;
        totalGross: number | null;
        marginRate: number | null;
        rows: {
            code: string;
            amount: number;
            spec: string;
            cost: number | null;
            skuId: string;
            qty: number;
            gross: number | null;
            marginRate: number | null;
        }[];
    };
}>;
export type ReportSummary = z.infer<typeof ReportSummarySchema>;
export declare const TodoTypeSchema: z.ZodEnum<["order", "warning", "notice", "rma", "transfer", "stocktake", "purchase", "shipment", "invoice", "followup", "exchange"]>;
/**
 * 采购报表：按采购单创建时间分桶（与 getReport 同口径）；receivedRate 为已入库金额占比，
 * 无采购单时为 null。supplierRanking 按采购金额降序；statusCounts 覆盖全部七种状态（含 0）。
 */
export declare const PurchaseReportSchema: z.ZodObject<{
    range: z.ZodEnum<["7d", "30d", "month"]>;
    /** 6 个等长桶，label 为桶首日 M-D，amount 单位：分（采购单总额） */
    buckets: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        label: string;
    }, {
        amount: number;
        label: string;
    }>, "many">;
    supplierRanking: z.ZodArray<z.ZodObject<{
        supplierId: z.ZodString;
        name: z.ZodString;
        amount: z.ZodNumber;
        count: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        name: string;
        supplierId: string;
        count: number;
    }, {
        amount: number;
        name: string;
        supplierId: string;
        count: number;
    }>, "many">;
    statusCounts: z.ZodArray<z.ZodObject<{
        status: z.ZodEnum<["draft", "submitted", "approved", "partially_received", "received", "rejected", "cancelled"]>;
        count: z.ZodNumber;
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        status: "received" | "draft" | "cancelled" | "submitted" | "approved" | "partially_received" | "rejected";
        amount: number;
        count: number;
    }, {
        status: "received" | "draft" | "cancelled" | "submitted" | "approved" | "partially_received" | "rejected";
        amount: number;
        count: number;
    }>, "many">;
    /** 已入库（received）金额 / 全部采购单总额，无采购单时为 null */
    receivedRate: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    range: "7d" | "30d" | "month";
    buckets: {
        amount: number;
        label: string;
    }[];
    supplierRanking: {
        amount: number;
        name: string;
        supplierId: string;
        count: number;
    }[];
    statusCounts: {
        status: "received" | "draft" | "cancelled" | "submitted" | "approved" | "partially_received" | "rejected";
        amount: number;
        count: number;
    }[];
    receivedRate: number | null;
}, {
    range: "7d" | "30d" | "month";
    buckets: {
        amount: number;
        label: string;
    }[];
    supplierRanking: {
        amount: number;
        name: string;
        supplierId: string;
        count: number;
    }[];
    statusCounts: {
        status: "received" | "draft" | "cancelled" | "submitted" | "approved" | "partially_received" | "rejected";
        amount: number;
        count: number;
    }[];
    receivedRate: number | null;
}>;
export type PurchaseReport = z.infer<typeof PurchaseReportSchema>;
export type TodoType = z.infer<typeof TodoTypeSchema>;
export declare const TodoItemSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["order", "warning", "notice", "rma", "transfer", "stocktake", "purchase", "shipment", "invoice", "followup", "exchange"]>;
    typeLabel: z.ZodString;
    cls: z.ZodString;
    title: z.ZodString;
    refNo: z.ZodString;
    actor: z.ZodString;
    /** ISO 时间串；预警类无时间时为空串 */
    time: z.ZodString;
    done: z.ZodBoolean;
    action: z.ZodString;
    to: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "order" | "warning" | "notice" | "rma" | "transfer" | "stocktake" | "purchase" | "shipment" | "invoice" | "followup" | "exchange";
    id: string;
    done: boolean;
    title: string;
    typeLabel: string;
    cls: string;
    refNo: string;
    actor: string;
    time: string;
    action: string;
    to: string;
}, {
    type: "order" | "warning" | "notice" | "rma" | "transfer" | "stocktake" | "purchase" | "shipment" | "invoice" | "followup" | "exchange";
    id: string;
    done: boolean;
    title: string;
    typeLabel: string;
    cls: string;
    refNo: string;
    actor: string;
    time: string;
    action: string;
    to: string;
}>;
export type TodoItem = z.infer<typeof TodoItemSchema>;
export declare const TodoListQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodOptional<z.ZodEnum<["order", "warning", "notice", "rma", "transfer", "stocktake", "purchase", "shipment", "invoice", "followup", "exchange"]>>;
    status: z.ZodOptional<z.ZodEnum<["pending", "done"]>>;
    keyword: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    type?: "order" | "warning" | "notice" | "rma" | "transfer" | "stocktake" | "purchase" | "shipment" | "invoice" | "followup" | "exchange" | undefined;
    status?: "done" | "pending" | undefined;
    search?: string | undefined;
    keyword?: string | undefined;
}, {
    type?: "order" | "warning" | "notice" | "rma" | "transfer" | "stocktake" | "purchase" | "shipment" | "invoice" | "followup" | "exchange" | undefined;
    status?: "done" | "pending" | undefined;
    page?: number | undefined;
    pageSize?: number | undefined;
    search?: string | undefined;
    keyword?: string | undefined;
}>;
export type TodoListQuery = z.infer<typeof TodoListQuerySchema>;
export declare const TodoListPageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["order", "warning", "notice", "rma", "transfer", "stocktake", "purchase", "shipment", "invoice", "followup", "exchange"]>;
        typeLabel: z.ZodString;
        cls: z.ZodString;
        title: z.ZodString;
        refNo: z.ZodString;
        actor: z.ZodString;
        /** ISO 时间串；预警类无时间时为空串 */
        time: z.ZodString;
        done: z.ZodBoolean;
        action: z.ZodString;
        to: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "order" | "warning" | "notice" | "rma" | "transfer" | "stocktake" | "purchase" | "shipment" | "invoice" | "followup" | "exchange";
        id: string;
        done: boolean;
        title: string;
        typeLabel: string;
        cls: string;
        refNo: string;
        actor: string;
        time: string;
        action: string;
        to: string;
    }, {
        type: "order" | "warning" | "notice" | "rma" | "transfer" | "stocktake" | "purchase" | "shipment" | "invoice" | "followup" | "exchange";
        id: string;
        done: boolean;
        title: string;
        typeLabel: string;
        cls: string;
        refNo: string;
        actor: string;
        time: string;
        action: string;
        to: string;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        type: "order" | "warning" | "notice" | "rma" | "transfer" | "stocktake" | "purchase" | "shipment" | "invoice" | "followup" | "exchange";
        id: string;
        done: boolean;
        title: string;
        typeLabel: string;
        cls: string;
        refNo: string;
        actor: string;
        time: string;
        action: string;
        to: string;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        type: "order" | "warning" | "notice" | "rma" | "transfer" | "stocktake" | "purchase" | "shipment" | "invoice" | "followup" | "exchange";
        id: string;
        done: boolean;
        title: string;
        typeLabel: string;
        cls: string;
        refNo: string;
        actor: string;
        time: string;
        action: string;
        to: string;
    }[];
    total: number;
}>;
export type TodoListPage = z.infer<typeof TodoListPageSchema>;
export declare const FinanceSummarySchema: z.ZodObject<{
    receivable: z.ZodNumber;
    payable: z.ZodNumber;
    receivedThisMonth: z.ZodNumber;
    paidThisMonth: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    receivable: number;
    payable: number;
    receivedThisMonth: number;
    paidThisMonth: number;
}, {
    receivable: number;
    payable: number;
    receivedThisMonth: number;
    paidThisMonth: number;
}>;
export type FinanceSummary = z.infer<typeof FinanceSummarySchema>;
export declare const ReceivableRowSchema: z.ZodObject<{
    id: z.ZodString;
    orderNo: z.ZodString;
    status: z.ZodEnum<["draft", "confirmed", "paid", "fulfilled", "cancelled"]>;
    amount: z.ZodNumber;
    currency: z.ZodString;
    settled: z.ZodNumber;
    unsettled: z.ZodNumber;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "confirmed" | "paid" | "fulfilled" | "cancelled";
    amount: number;
    currency: string;
    id: string;
    createdAt: string;
    orderNo: string;
    settled: number;
    unsettled: number;
}, {
    status: "draft" | "confirmed" | "paid" | "fulfilled" | "cancelled";
    amount: number;
    currency: string;
    id: string;
    createdAt: string;
    orderNo: string;
    settled: number;
    unsettled: number;
}>;
export type ReceivableRow = z.infer<typeof ReceivableRowSchema>;
export declare const ReceivablePageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        orderNo: z.ZodString;
        status: z.ZodEnum<["draft", "confirmed", "paid", "fulfilled", "cancelled"]>;
        amount: z.ZodNumber;
        currency: z.ZodString;
        settled: z.ZodNumber;
        unsettled: z.ZodNumber;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "confirmed" | "paid" | "fulfilled" | "cancelled";
        amount: number;
        currency: string;
        id: string;
        createdAt: string;
        orderNo: string;
        settled: number;
        unsettled: number;
    }, {
        status: "draft" | "confirmed" | "paid" | "fulfilled" | "cancelled";
        amount: number;
        currency: string;
        id: string;
        createdAt: string;
        orderNo: string;
        settled: number;
        unsettled: number;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        status: "draft" | "confirmed" | "paid" | "fulfilled" | "cancelled";
        amount: number;
        currency: string;
        id: string;
        createdAt: string;
        orderNo: string;
        settled: number;
        unsettled: number;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        status: "draft" | "confirmed" | "paid" | "fulfilled" | "cancelled";
        amount: number;
        currency: string;
        id: string;
        createdAt: string;
        orderNo: string;
        settled: number;
        unsettled: number;
    }[];
    total: number;
}>;
export type ReceivablePage = z.infer<typeof ReceivablePageSchema>;
/** 应付行：由采购订单派生，与应收行同结构（单号为采购单号） */
export declare const PayableRowSchema: z.ZodObject<{
    id: z.ZodString;
    orderNo: z.ZodString;
    status: z.ZodEnum<["draft", "submitted", "approved", "partially_received", "received", "rejected", "cancelled"]>;
    amount: z.ZodNumber;
    currency: z.ZodString;
    settled: z.ZodNumber;
    unsettled: z.ZodNumber;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "received" | "draft" | "cancelled" | "submitted" | "approved" | "partially_received" | "rejected";
    amount: number;
    currency: string;
    id: string;
    createdAt: string;
    orderNo: string;
    settled: number;
    unsettled: number;
}, {
    status: "received" | "draft" | "cancelled" | "submitted" | "approved" | "partially_received" | "rejected";
    amount: number;
    currency: string;
    id: string;
    createdAt: string;
    orderNo: string;
    settled: number;
    unsettled: number;
}>;
export type PayableRow = z.infer<typeof PayableRowSchema>;
export declare const PayablePageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        orderNo: z.ZodString;
        status: z.ZodEnum<["draft", "submitted", "approved", "partially_received", "received", "rejected", "cancelled"]>;
        amount: z.ZodNumber;
        currency: z.ZodString;
        settled: z.ZodNumber;
        unsettled: z.ZodNumber;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "received" | "draft" | "cancelled" | "submitted" | "approved" | "partially_received" | "rejected";
        amount: number;
        currency: string;
        id: string;
        createdAt: string;
        orderNo: string;
        settled: number;
        unsettled: number;
    }, {
        status: "received" | "draft" | "cancelled" | "submitted" | "approved" | "partially_received" | "rejected";
        amount: number;
        currency: string;
        id: string;
        createdAt: string;
        orderNo: string;
        settled: number;
        unsettled: number;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        status: "received" | "draft" | "cancelled" | "submitted" | "approved" | "partially_received" | "rejected";
        amount: number;
        currency: string;
        id: string;
        createdAt: string;
        orderNo: string;
        settled: number;
        unsettled: number;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        status: "received" | "draft" | "cancelled" | "submitted" | "approved" | "partially_received" | "rejected";
        amount: number;
        currency: string;
        id: string;
        createdAt: string;
        orderNo: string;
        settled: number;
        unsettled: number;
    }[];
    total: number;
}>;
export type PayablePage = z.infer<typeof PayablePageSchema>;
export declare const RecentActivitySchema: z.ZodArray<z.ZodObject<{
    text: z.ZodString;
    meta: z.ZodString;
    time: z.ZodString;
}, "strip", z.ZodTypeAny, {
    time: string;
    text: string;
    meta: string;
}, {
    time: string;
    text: string;
    meta: string;
}>, "many">;
export type RecentActivity = z.infer<typeof RecentActivitySchema>;
export declare const MovementTypeSchema: z.ZodEnum<["outbound", "reserve", "inbound", "transfer", "adjust"]>;
export type MovementType = z.infer<typeof MovementTypeSchema>;
export declare const MovementRowSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["outbound", "reserve", "inbound", "transfer", "adjust"]>;
    typeLabel: z.ZodString;
    cls: z.ZodString;
    batch: z.ZodString;
    skuId: z.ZodString;
    skuName: z.ZodString;
    delta: z.ZodNumber;
    refNo: z.ZodString;
    actor: z.ZodString;
    time: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "inbound" | "reserve" | "outbound" | "transfer" | "adjust";
    id: string;
    skuId: string;
    typeLabel: string;
    cls: string;
    refNo: string;
    actor: string;
    time: string;
    batch: string;
    skuName: string;
    delta: number;
}, {
    type: "inbound" | "reserve" | "outbound" | "transfer" | "adjust";
    id: string;
    skuId: string;
    typeLabel: string;
    cls: string;
    refNo: string;
    actor: string;
    time: string;
    batch: string;
    skuName: string;
    delta: number;
}>;
export type MovementRow = z.infer<typeof MovementRowSchema>;
export declare const MovementListQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodOptional<z.ZodEnum<["outbound", "reserve", "inbound", "transfer", "adjust"]>>;
    keyword: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    type?: "inbound" | "reserve" | "outbound" | "transfer" | "adjust" | undefined;
    search?: string | undefined;
    keyword?: string | undefined;
}, {
    type?: "inbound" | "reserve" | "outbound" | "transfer" | "adjust" | undefined;
    page?: number | undefined;
    pageSize?: number | undefined;
    search?: string | undefined;
    keyword?: string | undefined;
}>;
export type MovementListQuery = z.infer<typeof MovementListQuerySchema>;
export declare const MovementListPageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["outbound", "reserve", "inbound", "transfer", "adjust"]>;
        typeLabel: z.ZodString;
        cls: z.ZodString;
        batch: z.ZodString;
        skuId: z.ZodString;
        skuName: z.ZodString;
        delta: z.ZodNumber;
        refNo: z.ZodString;
        actor: z.ZodString;
        time: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "inbound" | "reserve" | "outbound" | "transfer" | "adjust";
        id: string;
        skuId: string;
        typeLabel: string;
        cls: string;
        refNo: string;
        actor: string;
        time: string;
        batch: string;
        skuName: string;
        delta: number;
    }, {
        type: "inbound" | "reserve" | "outbound" | "transfer" | "adjust";
        id: string;
        skuId: string;
        typeLabel: string;
        cls: string;
        refNo: string;
        actor: string;
        time: string;
        batch: string;
        skuName: string;
        delta: number;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        type: "inbound" | "reserve" | "outbound" | "transfer" | "adjust";
        id: string;
        skuId: string;
        typeLabel: string;
        cls: string;
        refNo: string;
        actor: string;
        time: string;
        batch: string;
        skuName: string;
        delta: number;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        type: "inbound" | "reserve" | "outbound" | "transfer" | "adjust";
        id: string;
        skuId: string;
        typeLabel: string;
        cls: string;
        refNo: string;
        actor: string;
        time: string;
        batch: string;
        skuName: string;
        delta: number;
    }[];
    total: number;
}>;
export type MovementListPage = z.infer<typeof MovementListPageSchema>;
