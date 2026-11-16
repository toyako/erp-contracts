import { z } from 'zod';
import { IdSchema, MoneySchema, pageResult } from './common';

/** 采购入库单（GRN）：每次入库动作建一张，记录本次实际收到的行与批次 */
export const GoodsReceiptLineSchema = z.object({
  id: IdSchema,
  skuId: IdSchema,
  quantity: z.number().int().positive(),
  /** 本次入库进的批次（无批次时新建，batchCode = 采购单号；有批次时为既有批次） */
  batchCode: z.string(),
});
export type GoodsReceiptLine = z.infer<typeof GoodsReceiptLineSchema>;

export const GoodsReceiptSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  receiptNo: z.string(),
  purchaseOrderId: IdSchema,
  orderNo: z.string(),
  lines: z.array(GoodsReceiptLineSchema),
  receivedAt: z.string(),
  createdAt: z.string(),
});
export type GoodsReceipt = z.infer<typeof GoodsReceiptSchema>;

export const GoodsReceiptPageSchema = pageResult(GoodsReceiptSchema);
export type GoodsReceiptPage = z.infer<typeof GoodsReceiptPageSchema>;

export const GoodsReceiptListQuerySchema = z.object({
  purchaseOrderId: z.string().uuid().optional(),
});
export type GoodsReceiptListQuery = z.infer<typeof GoodsReceiptListQuerySchema>;
