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

/** 采购订单：draft -> submitted -> received / cancelled */
export const PurchaseOrderStatusSchema = z.enum(['draft', 'submitted', 'received', 'cancelled']);
export type PurchaseOrderStatus = z.infer<typeof PurchaseOrderStatusSchema>;

/** 显式状态机：终态不可回退，照抄销售订单的做法 */
export const PURCHASE_ORDER_TRANSITIONS: Record<PurchaseOrderStatus, readonly PurchaseOrderStatus[]> = {
  draft: ['submitted', 'cancelled'],
  submitted: ['received', 'cancelled'],
  received: [],
  cancelled: [],
};

export const PurchaseOrderLineSchema = z.object({
  id: IdSchema,
  skuId: IdSchema,
  quantity: z.number().int().positive(),
  unitPrice: MoneySchema,
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
