import { z } from 'zod';
import { IdSchema, pageResult } from './common';

/** 发货单：draft -> picking -> packed -> shipped -> delivered；draft/picking/packed -> cancelled */
export const ShipmentStatusSchema = z.enum(['draft', 'picking', 'packed', 'shipped', 'delivered', 'cancelled']);
export type ShipmentStatus = z.infer<typeof ShipmentStatusSchema>;

/** 显式状态机：终态不可回退，照抄退货单的做法 */
export const SHIPMENT_TRANSITIONS: Record<ShipmentStatus, readonly ShipmentStatus[]> = {
  draft: ['picking', 'cancelled'],
  picking: ['packed', 'cancelled'],
  packed: ['shipped', 'cancelled'],
  shipped: ['delivered'],
  delivered: [],
  cancelled: [],
};

export const ShipmentLineSchema = z.object({
  skuId: IdSchema,
  quantity: z.number().int().positive(),
  /** 拣货时回填：履约扣数的同一批次（findLotBySku 的批次） */
  batchCode: z.string().nullable(),
});
export type ShipmentLine = z.infer<typeof ShipmentLineSchema>;

/** 发货单：一单只针对一个销售订单，行照抄订单行 */
export const ShipmentSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  shipmentNo: z.string(),
  orderId: IdSchema,
  orderNo: z.string(),
  status: ShipmentStatusSchema,
  lines: z.array(ShipmentLineSchema),
  /** 承运商与物流单号：发货时必填 */
  carrier: z.string().nullable(),
  trackingNo: z.string().nullable(),
  createdAt: z.string(),
  shippedAt: z.string().nullable(),
  deliveredAt: z.string().nullable(),
});
export type Shipment = z.infer<typeof ShipmentSchema>;

export const CreateShipmentRequestSchema = z.object({
  orderId: IdSchema,
});
export type CreateShipmentRequest = z.infer<typeof CreateShipmentRequestSchema>;

/** 发货：承运商与物流单号必填 */
export const ShipShipmentRequestSchema = z.object({
  carrier: z.string().min(1, '承运商不能为空').max(64),
  trackingNo: z.string().min(1, '物流单号不能为空').max(64),
});
export type ShipShipmentRequest = z.infer<typeof ShipShipmentRequestSchema>;

export const ShipmentPageSchema = pageResult(ShipmentSchema);
export type ShipmentPage = z.infer<typeof ShipmentPageSchema>;
