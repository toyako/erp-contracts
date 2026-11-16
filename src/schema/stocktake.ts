import { z } from 'zod';
import { IdSchema, pageResult } from './common';

/** 盘点：draft -> confirmed；draft -> cancelled */
export const StocktakeStatusSchema = z.enum(['draft', 'confirmed', 'cancelled']);
export type StocktakeStatus = z.infer<typeof StocktakeStatusSchema>;

/** 显式状态机：终态不可回退，照抄退货单的做法 */
export const STOCKTAKE_TRANSITIONS: Record<StocktakeStatus, readonly StocktakeStatus[]> = {
  draft: ['confirmed', 'cancelled'],
  confirmed: [],
  cancelled: [],
};

/**
 * 盘点单：针对单个批次实盘，systemQty 为建单时该批次 totalQty 的快照，
 * difference = countedQty - systemQty，由服务端算并存下来（不随后续库存变而变）
 */
export const StocktakeSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  stocktakeNo: z.string(),
  lotId: IdSchema,
  skuId: IdSchema,
  countedQty: z.number().int().nonnegative(),
  systemQty: z.number().int().nonnegative(),
  difference: z.number().int(),
  status: StocktakeStatusSchema,
  createdAt: z.string(),
  confirmedAt: z.string().nullable(),
});
export type Stocktake = z.infer<typeof StocktakeSchema>;

export const CreateStocktakeRequestSchema = z.object({
  lotId: IdSchema,
  countedQty: z.number().int().nonnegative(),
});
export type CreateStocktakeRequest = z.infer<typeof CreateStocktakeRequestSchema>;

export const StocktakePageSchema = pageResult(StocktakeSchema);
export type StocktakePage = z.infer<typeof StocktakePageSchema>;
