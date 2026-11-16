import { z } from 'zod';
import { pageResult, PageQueryParamsSchema } from './common';
import { PurchaseOrderStatusSchema } from './purchase';
import { OrderStatusSchema } from './sales';

/**
 * 仪表盘汇总契约：聚合页（经营概览 / 报表 / 待办 / 应收应付 / 设置日志 / 库存流水）
 * 不再从列表接口拉全量 pageSize: 200 后在前端聚合，统一走服务端汇总。
 * 金额一律以“分”为单位的非负整数。
 */

export const ReportRangeSchema = z.enum(['7d', '30d', 'month']);
export type ReportRange = z.infer<typeof ReportRangeSchema>;

/** GET /dashboard/report 的 query：range 缺省为 7d */
export const ReportQuerySchema = z.object({
  range: ReportRangeSchema.default('7d'),
});
export type ReportQuery = z.infer<typeof ReportQuerySchema>;

export const OverviewSummarySchema = z.object({
  /** 全部订单 total.amount 之和（含已取消），单位：分 */
  salesAmount: z.number().int().nonnegative(),
  orderCount: z.number().int().nonnegative(),
  fulfilledCount: z.number().int().nonnegative(),
  availableStock: z.number().int().nonnegative(),
  reservedStock: z.number().int().nonnegative(),
  /** 可用量 < 20 的批次数 */
  warningCount: z.number().int().nonnegative(),
  statusDist: z.array(
    z.object({
      status: OrderStatusSchema,
      count: z.number().int().nonnegative(),
    }),
  ),
  /** 近 7 个自然日（服务端 UTC 日），date 为 YYYY-MM-DD */
  trend7: z.array(
    z.object({
      date: z.string(),
      amount: z.number().int().nonnegative(),
    }),
  ),
  /** 近 30 个自然日（与 trend7 同口径，供概览趋势图切换） */
  trend30: z.array(
    z.object({
      date: z.string(),
      amount: z.number().int().nonnegative(),
    }),
  ),
  /** 按订单行数量取前 5；SKU 缺失时 code 为 skuId 前 8 位、spec 为空串 */
  ranking: z.array(
    z.object({
      skuId: z.string().uuid(),
      code: z.string(),
      spec: z.string(),
      qty: z.number().int().nonnegative(),
    }),
  ),
  /** 批次按 availableQty 升序取前 4；SKU 缺失时 skuCode 为 '—' */
  lowStock: z.array(
    z.object({
      batchCode: z.string(),
      skuCode: z.string(),
      availableQty: z.number().int().nonnegative(),
      reservedQty: z.number().int().nonnegative(),
      totalQty: z.number().int().nonnegative(),
    }),
  ),
  /** 按 code 升序第一个 SKU，无 SKU 时为 null */
  firstSku: z.object({ id: z.string().uuid(), code: z.string() }).nullable(),
});
export type OverviewSummary = z.infer<typeof OverviewSummarySchema>;

export const ReportSummarySchema = z.object({
  range: ReportRangeSchema,
  /** 6 个等长桶，label 为桶首日 M-D，amount 单位：分 */
  buckets: z.array(
    z.object({
      label: z.string(),
      amount: z.number().int().nonnegative(),
    }),
  ),
  /** 按 amount 降序；change 为数量相对上一区间的变化百分比，上一区间为 0 时为 null */
  ranking: z.array(
    z.object({
      skuId: z.string().uuid(),
      code: z.string(),
      spec: z.string(),
      qty: z.number().int().nonnegative(),
      amount: z.number().int().nonnegative(),
      change: z.number().nullable(),
    }),
  ),
  /** 全部 SKU：days 为库存周转天数（1 位小数），无销量时为 null；pct 相对最大 days */
  turnover: z.array(
    z.object({
      name: z.string(),
      stock: z.number().int().nonnegative(),
      days: z.number().nullable(),
      pct: z.number().int().nonnegative(),
    }),
  ),
  /** 区间内无销量的 SKU */
  slow: z.array(
    z.object({
      name: z.string(),
      stock: z.number().int().nonnegative(),
    }),
  ),
  /**
   * 毛利：按订单行算（销售额 = 行单价×数量，成本 = SKU 成本价×数量，只计非 cancelled 订单）。
   * cost/gross/marginRate 为 null 表示该 SKU 未维护成本价；汇总只计已维护成本的 SKU，
   * 全部未维护时 totalGross/marginRate 为 null；marginRate 为毛利率百分比（1 位小数）。
   */
  gross: z.object({
    totalAmount: z.number().int().nonnegative(),
    totalCost: z.number().int().nonnegative(),
    totalGross: z.number().int().nullable(),
    marginRate: z.number().nullable(),
    rows: z.array(
      z.object({
        skuId: z.string().uuid(),
        code: z.string(),
        spec: z.string(),
        qty: z.number().int().nonnegative(),
        amount: z.number().int().nonnegative(),
        cost: z.number().int().nullable(),
        gross: z.number().int().nullable(),
        marginRate: z.number().nullable(),
      }),
    ),
  }),
});
export type ReportSummary = z.infer<typeof ReportSummarySchema>;

export const TodoTypeSchema = z.enum(['order', 'warning', 'notice', 'rma', 'transfer', 'stocktake', 'purchase', 'shipment', 'invoice']);

/**
 * 采购报表：按采购单创建时间分桶（与 getReport 同口径）；receivedRate 为已入库金额占比，
 * 无采购单时为 null。supplierRanking 按采购金额降序；statusCounts 覆盖全部七种状态（含 0）。
 */
export const PurchaseReportSchema = z.object({
  range: ReportRangeSchema,
  /** 6 个等长桶，label 为桶首日 M-D，amount 单位：分（采购单总额） */
  buckets: z.array(
    z.object({
      label: z.string(),
      amount: z.number().int().nonnegative(),
    }),
  ),
  supplierRanking: z.array(
    z.object({
      supplierId: z.string().uuid(),
      name: z.string(),
      amount: z.number().int().nonnegative(),
      count: z.number().int().nonnegative(),
    }),
  ),
  statusCounts: z.array(
    z.object({
      status: PurchaseOrderStatusSchema,
      count: z.number().int().nonnegative(),
      amount: z.number().int().nonnegative(),
    }),
  ),
  /** 已入库（received）金额 / 全部采购单总额，无采购单时为 null */
  receivedRate: z.number().nullable(),
});
export type PurchaseReport = z.infer<typeof PurchaseReportSchema>;
export type TodoType = z.infer<typeof TodoTypeSchema>;

export const TodoItemSchema = z.object({
  id: z.string(),
  type: TodoTypeSchema,
  typeLabel: z.string(),
  cls: z.string(),
  title: z.string(),
  refNo: z.string(),
  actor: z.string(),
  /** ISO 时间串；预警类无时间时为空串 */
  time: z.string(),
  done: z.boolean(),
  action: z.string(),
  to: z.string(),
});
export type TodoItem = z.infer<typeof TodoItemSchema>;

export const TodoListQuerySchema = PageQueryParamsSchema.extend({
  type: TodoTypeSchema.optional(),
  status: z.enum(['pending', 'done']).optional(),
  keyword: z.string().optional(),
});
export type TodoListQuery = z.infer<typeof TodoListQuerySchema>;

export const TodoListPageSchema = pageResult(TodoItemSchema);
export type TodoListPage = z.infer<typeof TodoListPageSchema>;

export const FinanceSummarySchema = z.object({
  receivable: z.number().int().nonnegative(),
  payable: z.number().int().nonnegative(),
  receivedThisMonth: z.number().int().nonnegative(),
  paidThisMonth: z.number().int().nonnegative(),
});
export type FinanceSummary = z.infer<typeof FinanceSummarySchema>;

export const ReceivableRowSchema = z.object({
  id: z.string().uuid(),
  orderNo: z.string(),
  status: OrderStatusSchema,
  amount: z.number().int().nonnegative(),
  currency: z.string().length(3),
  settled: z.number().int().nonnegative(),
  unsettled: z.number().int().nonnegative(),
  createdAt: z.string(),
});
export type ReceivableRow = z.infer<typeof ReceivableRowSchema>;

export const ReceivablePageSchema = pageResult(ReceivableRowSchema);
export type ReceivablePage = z.infer<typeof ReceivablePageSchema>;

/** 应付行：由采购订单派生，与应收行同结构（单号为采购单号） */
export const PayableRowSchema = z.object({
  id: z.string().uuid(),
  orderNo: z.string(),
  status: PurchaseOrderStatusSchema,
  amount: z.number().int().nonnegative(),
  currency: z.string().length(3),
  settled: z.number().int().nonnegative(),
  unsettled: z.number().int().nonnegative(),
  createdAt: z.string(),
});
export type PayableRow = z.infer<typeof PayableRowSchema>;

export const PayablePageSchema = pageResult(PayableRowSchema);
export type PayablePage = z.infer<typeof PayablePageSchema>;

export const RecentActivitySchema = z.array(
  z.object({
    text: z.string(),
    meta: z.string(),
    time: z.string(),
  }),
);
export type RecentActivity = z.infer<typeof RecentActivitySchema>;

export const MovementTypeSchema = z.enum(['outbound', 'reserve', 'inbound', 'transfer', 'adjust']);
export type MovementType = z.infer<typeof MovementTypeSchema>;

export const MovementRowSchema = z.object({
  id: z.string(),
  type: MovementTypeSchema,
  typeLabel: z.string(),
  cls: z.string(),
  batch: z.string(),
  skuId: z.string().uuid(),
  skuName: z.string(),
  delta: z.number().int(),
  refNo: z.string(),
  actor: z.string(),
  time: z.string(),
});
export type MovementRow = z.infer<typeof MovementRowSchema>;

export const MovementListQuerySchema = PageQueryParamsSchema.extend({
  type: MovementTypeSchema.optional(),
  keyword: z.string().optional(),
});
export type MovementListQuery = z.infer<typeof MovementListQuerySchema>;

export const MovementListPageSchema = pageResult(MovementRowSchema);
export type MovementListPage = z.infer<typeof MovementListPageSchema>;
