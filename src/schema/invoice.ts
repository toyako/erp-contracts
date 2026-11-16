import { z } from 'zod';
import { IdSchema, MoneySchema, pageResult } from './common';

/** 发票类型：增值税专票 / 增值税普票 / 收据 */
export const InvoiceTypeSchema = z.enum(['vat_special', 'vat_normal', 'receipt']);
export type InvoiceType = z.infer<typeof InvoiceTypeSchema>;

/** 发票：draft -> issued -> voided；draft -> cancelled */
export const InvoiceStatusSchema = z.enum(['draft', 'issued', 'voided', 'cancelled']);
export type InvoiceStatus = z.infer<typeof InvoiceStatusSchema>;

/** 显式状态机：终态不可回退，照抄退货单的做法 */
export const INVOICE_TRANSITIONS: Record<InvoiceStatus, readonly InvoiceStatus[]> = {
  draft: ['issued', 'cancelled'],
  issued: ['voided'],
  voided: [],
  cancelled: [],
};

/** 发票：一单可开多张（分次开票），累计金额不超过订单总额；只限已付款/已完成订单 */
export const InvoiceSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  invoiceNo: z.string(),
  orderId: IdSchema,
  orderNo: z.string(),
  /** 散客订单无客户，存 null */
  customerId: IdSchema.nullable(),
  amount: MoneySchema,
  type: InvoiceTypeSchema,
  /** 抬头：默认订单客户名，无客户时为“散客”，建单时可改 */
  title: z.string(),
  status: InvoiceStatusSchema,
  createdAt: z.string(),
  issuedAt: z.string().nullable(),
});
export type Invoice = z.infer<typeof InvoiceSchema>;

export const CreateInvoiceRequestSchema = z.object({
  orderId: IdSchema,
  /** 开票金额（分）：必须大于 0，且累计不超过订单总额（服务端校验） */
  amount: MoneySchema.refine((m) => m.amount > 0, '开票金额必须大于 0'),
  type: InvoiceTypeSchema.optional(),
  title: z.string().max(200, '抬头最多 200 字').optional(),
});
export type CreateInvoiceRequest = z.infer<typeof CreateInvoiceRequestSchema>;

export const InvoicePageSchema = pageResult(InvoiceSchema);
export type InvoicePage = z.infer<typeof InvoicePageSchema>;
