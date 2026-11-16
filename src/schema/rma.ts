import { z } from 'zod';
import { IdSchema, MoneySchema, pageResult } from './common';

/** 售后退货：requested -> approved -> received -> refunded；requested -> rejected；requested/approved -> cancelled */
export const RmaStatusSchema = z.enum(['requested', 'approved', 'rejected', 'received', 'refunded', 'cancelled']);
export type RmaStatus = z.infer<typeof RmaStatusSchema>;

/** 显式状态机：终态不可回退，照抄采购订单的做法 */
export const RMA_TRANSITIONS: Record<RmaStatus, readonly RmaStatus[]> = {
  requested: ['approved', 'rejected', 'cancelled'],
  approved: ['received', 'cancelled'],
  rejected: [],
  received: ['refunded'],
  refunded: [],
  cancelled: [],
};

/** 退货单：一单只针对一个订单里一个 SKU 的数量，多 SKU 分多单申请 */
export const RmaSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  rmaNo: z.string(),
  orderId: IdSchema,
  skuId: IdSchema,
  quantity: z.number().int().positive(),
  reason: z.string().min(1).max(200),
  status: RmaStatusSchema,
  /** 退款金额由服务端按行单价 × 数量算，客户端不传金额 */
  refundAmount: MoneySchema,
  /** 拒绝原因：仅 rejected 状态下有值，由审核人在拒绝时填写 */
  rejectReason: z.string().nullable(),
  createdAt: z.string(),
  receivedAt: z.string().nullable(),
});
export type Rma = z.infer<typeof RmaSchema>;

/** 拒绝退货：原因必填（1–200 字），落库到 rejectReason */
export const RejectRmaRequestSchema = z.object({
  reason: z.string().min(1, '拒绝原因不能为空').max(200, '拒绝原因最多 200 字'),
});
export type RejectRmaRequest = z.infer<typeof RejectRmaRequestSchema>;

export const CreateRmaRequestSchema = z.object({
  orderId: IdSchema,
  skuId: IdSchema,
  quantity: z.number().int().positive(),
  reason: z.string().min(1, '退货原因不能为空').max(200),
});
export type CreateRmaRequest = z.infer<typeof CreateRmaRequestSchema>;

export const RmaPageSchema = pageResult(RmaSchema);
export type RmaPage = z.infer<typeof RmaPageSchema>;
