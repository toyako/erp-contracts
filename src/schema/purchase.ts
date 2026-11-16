import { z } from 'zod';
import { IdSchema, MoneySchema, pageResult } from './common';

/** 供应商（采购上下文） */
export const SupplierSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  code: z.string().min(1),
  name: z.string().min(1),
  contact: z.string().optional(),
  phone: z.string().optional(),
  rating: z.number().int().min(1).max(5),
  enabled: z.boolean(),
});
export type Supplier = z.infer<typeof SupplierSchema>;

export const CreateSupplierRequestSchema = z.object({
  code: z.string().min(1, '编码不能为空'),
  name: z.string().min(1, '名称不能为空'),
  contact: z.string().optional(),
  phone: z.string().optional(),
  rating: z.number().int().min(1).max(5).default(3),
});
export type CreateSupplierRequest = z.infer<typeof CreateSupplierRequestSchema>;

/** 供应商编辑：只传要改的字段，编码不可改 */
export const UpdateSupplierRequestSchema = z.object({
  name: z.string().min(1).optional(),
  contact: z.string().optional(),
  phone: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  enabled: z.boolean().optional(),
});
export type UpdateSupplierRequest = z.infer<typeof UpdateSupplierRequestSchema>;

/** 采购订单：draft -> submitted（待审核） -> approved（已审核） -> received / 部分入库 / cancelled；驳回为终态 */
export const PurchaseOrderStatusSchema = z.enum(['draft', 'submitted', 'approved', 'partially_received', 'received', 'rejected', 'cancelled']);
export type PurchaseOrderStatus = z.infer<typeof PurchaseOrderStatusSchema>;

/** 显式状态机：终态不可回退，照抄销售订单的做法；rejected 沿用退货单/调拨单的终态口径 */
export const PURCHASE_ORDER_TRANSITIONS: Record<PurchaseOrderStatus, readonly PurchaseOrderStatus[]> = {
  draft: ['submitted', 'cancelled'],
  submitted: ['approved', 'rejected', 'cancelled'],
  approved: ['partially_received', 'received', 'cancelled'],
  partially_received: ['received', 'cancelled'],
  received: [],
  rejected: [],
  cancelled: [],
};

export const PurchaseOrderLineSchema = z.object({
  id: IdSchema,
  skuId: IdSchema,
  quantity: z.number().int().positive(),
  unitPrice: MoneySchema,
  /** 已收数量（分批入库累加），默认 0 */
  receivedQty: z.number().int().nonnegative(),
});
export type PurchaseOrderLine = z.infer<typeof PurchaseOrderLineSchema>;

export const PurchaseOrderSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  orderNo: z.string(),
  supplierId: IdSchema,
  status: PurchaseOrderStatusSchema,
  lines: z.array(PurchaseOrderLineSchema),
  total: MoneySchema,
  /** 驳回原因（仅 rejected 时有值） */
  rejectReason: z.string().nullable(),
  createdAt: z.string(),
});
export type PurchaseOrder = z.infer<typeof PurchaseOrderSchema>;

export const CreatePurchaseOrderRequestSchema = z.object({
  supplierId: IdSchema,
  lines: z
    .array(
      z.object({
        skuId: IdSchema,
        quantity: z.number().int().positive(),
      }),
    )
    .min(1, '至少一行明细'),
});
export type CreatePurchaseOrderRequest = z.infer<typeof CreatePurchaseOrderRequestSchema>;

export const PurchaseOrderPageSchema = pageResult(PurchaseOrderSchema);
export type PurchaseOrderPage = z.infer<typeof PurchaseOrderPageSchema>;

/** 驳回请求：原因必填（空原因 400），沿用退货单拒绝原因的做法 */
export const RejectPurchaseOrderRequestSchema = z.object({
  reason: z.string().min(1, '驳回原因不能为空').max(256),
});
export type RejectPurchaseOrderRequest = z.infer<typeof RejectPurchaseOrderRequestSchema>;

/**
 * 入库请求：lines 缺省 = 整单收完（老行为，兼容冒烟与旧调用）；
 * 传 lines = 按行收指定数量（每行须 >0 且 ≤ 剩余量）。
 * 整个 body 可缺省（空 body 解析为 {}，即整单收完）。
 */
export const ReceivePurchaseOrderRequestSchema = z
  .object({
    lines: z
      .array(
        z.object({
          skuId: IdSchema,
          quantity: z.number().int().positive(),
        }),
      )
      .min(1)
      .optional(),
  })
  .default({});
export type ReceivePurchaseOrderRequest = z.infer<typeof ReceivePurchaseOrderRequestSchema>;
