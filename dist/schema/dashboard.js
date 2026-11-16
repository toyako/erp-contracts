"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementListPageSchema = exports.MovementListQuerySchema = exports.MovementRowSchema = exports.MovementTypeSchema = exports.RecentActivitySchema = exports.PayablePageSchema = exports.PayableRowSchema = exports.ReceivablePageSchema = exports.ReceivableRowSchema = exports.FinanceSummarySchema = exports.TodoListPageSchema = exports.TodoListQuerySchema = exports.TodoItemSchema = exports.TodoTypeSchema = exports.ReportSummarySchema = exports.OverviewSummarySchema = exports.ReportQuerySchema = exports.ReportRangeSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
const purchase_1 = require("./purchase");
const sales_1 = require("./sales");
/**
 * 仪表盘汇总契约：聚合页（经营概览 / 报表 / 待办 / 应收应付 / 设置日志 / 库存流水）
 * 不再从列表接口拉全量 pageSize: 200 后在前端聚合，统一走服务端汇总。
 * 金额一律以“分”为单位的非负整数。
 */
exports.ReportRangeSchema = zod_1.z.enum(['7d', '30d', 'month']);
/** GET /dashboard/report 的 query：range 缺省为 7d */
exports.ReportQuerySchema = zod_1.z.object({
    range: exports.ReportRangeSchema.default('7d'),
});
exports.OverviewSummarySchema = zod_1.z.object({
    /** 全部订单 total.amount 之和（含已取消），单位：分 */
    salesAmount: zod_1.z.number().int().nonnegative(),
    orderCount: zod_1.z.number().int().nonnegative(),
    fulfilledCount: zod_1.z.number().int().nonnegative(),
    availableStock: zod_1.z.number().int().nonnegative(),
    reservedStock: zod_1.z.number().int().nonnegative(),
    /** 可用量 < 20 的批次数 */
    warningCount: zod_1.z.number().int().nonnegative(),
    statusDist: zod_1.z.array(zod_1.z.object({
        status: sales_1.OrderStatusSchema,
        count: zod_1.z.number().int().nonnegative(),
    })),
    /** 近 7 个自然日（服务端 UTC 日），date 为 YYYY-MM-DD */
    trend7: zod_1.z.array(zod_1.z.object({
        date: zod_1.z.string(),
        amount: zod_1.z.number().int().nonnegative(),
    })),
    /** 按订单行数量取前 5；SKU 缺失时 code 为 skuId 前 8 位、spec 为空串 */
    ranking: zod_1.z.array(zod_1.z.object({
        skuId: zod_1.z.string().uuid(),
        code: zod_1.z.string(),
        spec: zod_1.z.string(),
        qty: zod_1.z.number().int().nonnegative(),
    })),
    /** 批次按 availableQty 升序取前 4；SKU 缺失时 skuCode 为 '—' */
    lowStock: zod_1.z.array(zod_1.z.object({
        batchCode: zod_1.z.string(),
        skuCode: zod_1.z.string(),
        availableQty: zod_1.z.number().int().nonnegative(),
        reservedQty: zod_1.z.number().int().nonnegative(),
        totalQty: zod_1.z.number().int().nonnegative(),
    })),
    /** 按 code 升序第一个 SKU，无 SKU 时为 null */
    firstSku: zod_1.z.object({ id: zod_1.z.string().uuid(), code: zod_1.z.string() }).nullable(),
});
exports.ReportSummarySchema = zod_1.z.object({
    range: exports.ReportRangeSchema,
    /** 6 个等长桶，label 为桶首日 M-D，amount 单位：分 */
    buckets: zod_1.z.array(zod_1.z.object({
        label: zod_1.z.string(),
        amount: zod_1.z.number().int().nonnegative(),
    })),
    /** 按 amount 降序；change 为数量相对上一区间的变化百分比，上一区间为 0 时为 null */
    ranking: zod_1.z.array(zod_1.z.object({
        skuId: zod_1.z.string().uuid(),
        code: zod_1.z.string(),
        spec: zod_1.z.string(),
        qty: zod_1.z.number().int().nonnegative(),
        amount: zod_1.z.number().int().nonnegative(),
        change: zod_1.z.number().nullable(),
    })),
    /** 全部 SKU：days 为库存周转天数（1 位小数），无销量时为 null；pct 相对最大 days */
    turnover: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        stock: zod_1.z.number().int().nonnegative(),
        days: zod_1.z.number().nullable(),
        pct: zod_1.z.number().int().nonnegative(),
    })),
    /** 区间内无销量的 SKU */
    slow: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        stock: zod_1.z.number().int().nonnegative(),
    })),
});
exports.TodoTypeSchema = zod_1.z.enum(['order', 'warning', 'notice', 'rma', 'transfer', 'stocktake', 'purchase', 'shipment']);
exports.TodoItemSchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: exports.TodoTypeSchema,
    typeLabel: zod_1.z.string(),
    cls: zod_1.z.string(),
    title: zod_1.z.string(),
    refNo: zod_1.z.string(),
    actor: zod_1.z.string(),
    /** ISO 时间串；预警类无时间时为空串 */
    time: zod_1.z.string(),
    done: zod_1.z.boolean(),
    action: zod_1.z.string(),
    to: zod_1.z.string(),
});
exports.TodoListQuerySchema = common_1.PageQueryParamsSchema.extend({
    type: exports.TodoTypeSchema.optional(),
    status: zod_1.z.enum(['pending', 'done']).optional(),
    keyword: zod_1.z.string().optional(),
});
exports.TodoListPageSchema = (0, common_1.pageResult)(exports.TodoItemSchema);
exports.FinanceSummarySchema = zod_1.z.object({
    receivable: zod_1.z.number().int().nonnegative(),
    payable: zod_1.z.number().int().nonnegative(),
    receivedThisMonth: zod_1.z.number().int().nonnegative(),
    paidThisMonth: zod_1.z.number().int().nonnegative(),
});
exports.ReceivableRowSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    orderNo: zod_1.z.string(),
    status: sales_1.OrderStatusSchema,
    amount: zod_1.z.number().int().nonnegative(),
    currency: zod_1.z.string().length(3),
    settled: zod_1.z.number().int().nonnegative(),
    unsettled: zod_1.z.number().int().nonnegative(),
    createdAt: zod_1.z.string(),
});
exports.ReceivablePageSchema = (0, common_1.pageResult)(exports.ReceivableRowSchema);
/** 应付行：由采购订单派生，与应收行同结构（单号为采购单号） */
exports.PayableRowSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    orderNo: zod_1.z.string(),
    status: purchase_1.PurchaseOrderStatusSchema,
    amount: zod_1.z.number().int().nonnegative(),
    currency: zod_1.z.string().length(3),
    settled: zod_1.z.number().int().nonnegative(),
    unsettled: zod_1.z.number().int().nonnegative(),
    createdAt: zod_1.z.string(),
});
exports.PayablePageSchema = (0, common_1.pageResult)(exports.PayableRowSchema);
exports.RecentActivitySchema = zod_1.z.array(zod_1.z.object({
    text: zod_1.z.string(),
    meta: zod_1.z.string(),
    time: zod_1.z.string(),
}));
exports.MovementTypeSchema = zod_1.z.enum(['outbound', 'reserve', 'inbound', 'transfer', 'adjust']);
exports.MovementRowSchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: exports.MovementTypeSchema,
    typeLabel: zod_1.z.string(),
    cls: zod_1.z.string(),
    batch: zod_1.z.string(),
    skuId: zod_1.z.string().uuid(),
    skuName: zod_1.z.string(),
    delta: zod_1.z.number().int(),
    refNo: zod_1.z.string(),
    actor: zod_1.z.string(),
    time: zod_1.z.string(),
});
exports.MovementListQuerySchema = common_1.PageQueryParamsSchema.extend({
    type: exports.MovementTypeSchema.optional(),
    keyword: zod_1.z.string().optional(),
});
exports.MovementListPageSchema = (0, common_1.pageResult)(exports.MovementRowSchema);
