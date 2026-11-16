import { z } from 'zod';
import { IdSchema, MoneySchema, pageResult } from './common';

/** 换货：requested -> approved -> received -> exchanged；requested -> rejected；requested/approved/received -> cancelled */
export const ExchangeStatusSchema = z.enum(['requested', 'approved', 'rejected', 'received', 'exchanged', 'cancelled']);
export type ExchangeStatus = z.infer<typeof ExchangeStatusSchema>;

/** 显式状态机：终态不可回退，照抄退货单的做法 */
export const EXCHANGE_TRANSITIONS: Record<ExchangeStatus, readonly ExchangeStatus[]> = {
  requested: ['approved', 'rejected', 'cancelled'],
  approved: ['received', 'cancelled'],
  rejected: [],
  received: ['exchanged', 'cancelled'],
  exchanged: [],
  cancelled: [],
};

/** 换货单：一次换货只针对一个订单里一个退货 SKU + 一个换入 SKU 的数量，多 SKU 分多单申请 */
export const ExchangeSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  exchangeNo: z.string(),
  orderId: IdSchema,
  returnSkuId: IdSchema,
  returnQty: z.number().int().positive(),
  exchangeSkuId: IdSchema,
  exchangeQty: z.number().int().positive(),
  /** 差价由服务端按“换入价 − 退货价”算：正数=客户补差价，负数=应退差价；只记数，不走真实支付 */
  diffAmount: MoneySchema.nullable(),
  status: ExchangeStatusSchema,
  /** 拒绝原因：仅 rejected 状态下有值，由审核人在拒绝时填写 */
  rejectReason: z.string().nullable(),
  createdAt: z.string(),
  receivedAt: z.string().nullable(),
  exchangedAt: z.string().nullable(),
});
export type Exchange = z.infer<typeof ExchangeSchema>;

/** 拒绝换货：原因必填（1–200 字），落库到 rejectReason */
export const RejectExchangeRequestSchema = z.object({
  reason: z.string().min(1, '拒绝原因不能为空').max(200, '拒绝原因最多 200 字'),
});
export type RejectExchangeRequest = z.infer<typeof RejectExchangeRequestSchema>;

export const CreateExchangeRequestSchema = z.object({
  orderId: IdSchema,
  returnSkuId: IdSchema,
  returnQty: z.number().int().positive(),
  exchangeSkuId: IdSchema,
  exchangeQty: z.number().int().positive(),
});
export type CreateExchangeRequest = z.infer<typeof CreateExchangeRequestSchema>;

export const ExchangePageSchema = pageResult(ExchangeSchema);
export type ExchangePage = z.infer<typeof ExchangePageSchema>;
