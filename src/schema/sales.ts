import { z } from 'zod';
import { IdSchema, MoneySchema, pageResult } from './common';

export const OrderStatusSchema = z.enum([
  'draft',
  'confirmed',
  'paid',
  'fulfilled',
  'cancelled',
]);
export type OrderStatus = z.infer<typeof OrderStatusSchema>;

/** 显式状态机：终态不可回退，见 docs/domain/state-machines.md */
export const ORDER_TRANSITIONS: Record<OrderStatus, readonly OrderStatus[]> = {
  draft: ['confirmed', 'cancelled'],
  confirmed: ['paid', 'cancelled'],
  paid: ['fulfilled'],
  fulfilled: [],
  cancelled: [],
};

export const OrderLineSchema = z.object({
  id: IdSchema,
  skuId: IdSchema,
  quantity: z.number().int().positive(),
  /** 成交价由服务端定价服务写入 */
  unitPrice: MoneySchema,
});
export type OrderLine = z.infer<typeof OrderLineSchema>;

export const SalesOrderSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  orderNo: z.string().min(1).max(64),
  status: OrderStatusSchema,
  lines: z.array(OrderLineSchema).min(1),
  total: MoneySchema,
  createdAt: z.string().datetime(),
});
export type SalesOrder = z.infer<typeof SalesOrderSchema>;

/** 客户端只传 SKU 与数量，绝不接收金额 */
export const CreateOrderRequestSchema = z.object({
  lines: z
    .array(z.object({ skuId: IdSchema, quantity: z.number().int().positive() }))
    .min(1),
});
export type CreateOrderRequest = z.infer<typeof CreateOrderRequestSchema>;

export const SalesOrderPageSchema = pageResult(SalesOrderSchema);
export type SalesOrderPage = z.infer<typeof SalesOrderPageSchema>;
