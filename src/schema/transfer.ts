import { z } from 'zod';
import { IdSchema, pageResult } from './common';

/** 调拨：draft -> completed；draft -> cancelled */
export const TransferStatusSchema = z.enum(['draft', 'completed', 'cancelled']);
export type TransferStatus = z.infer<typeof TransferStatusSchema>;

/** 显式状态机：终态不可回退，照抄退货单的做法 */
export const TRANSFER_TRANSITIONS: Record<TransferStatus, readonly TransferStatus[]> = {
  draft: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
};

/** 调拨单：在两个仓库/库位之间移动一个 SKU 的库存，数量从源批次扣、往目标批次加 */
export const TransferSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  transferNo: z.string(),
  skuId: IdSchema,
  fromLocation: z.string().min(1).max(32),
  toLocation: z.string().min(1).max(32),
  quantity: z.number().int().positive(),
  status: TransferStatusSchema,
  /** 完成时实际动用的源批次号（FIFO 取批），draft 为 null；流水凭此定位批次 */
  batchCode: z.string().nullable(),
  createdAt: z.string(),
  completedAt: z.string().nullable(),
});
export type Transfer = z.infer<typeof TransferSchema>;

export const CreateTransferRequestSchema = z.object({
  skuId: IdSchema,
  fromLocation: z.string().min(1, '源库位不能为空').max(32),
  toLocation: z.string().min(1, '目标库位不能为空').max(32),
  quantity: z.number().int().positive(),
});
export type CreateTransferRequest = z.infer<typeof CreateTransferRequestSchema>;

export const TransferPageSchema = pageResult(TransferSchema);
export type TransferPage = z.infer<typeof TransferPageSchema>;
