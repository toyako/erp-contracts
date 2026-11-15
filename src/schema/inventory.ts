import { z } from 'zod';
import { IdSchema, pageResult } from './common';

export const InventoryLotSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  skuId: IdSchema,
  batchCode: z.string().min(1).max(64),
  /** 可被占用的数量 */
  availableQty: z.number().int().nonnegative(),
  /** 已下单未履约、不可再售的数量 */
  reservedQty: z.number().int().nonnegative(),
  totalQty: z.number().int().nonnegative(),
});
export type InventoryLot = z.infer<typeof InventoryLotSchema>;

/** 占用只改状态不改总量，禁止用删除记录表示售出 */
export const ReserveStockRequestSchema = z.object({
  skuId: IdSchema,
  quantity: z.number().int().positive(),
  orderId: IdSchema,
});
export type ReserveStockRequest = z.infer<typeof ReserveStockRequestSchema>;

export const StockMovementSchema = z.object({
  id: IdSchema,
  lotId: IdSchema,
  type: z.enum(['inbound', 'reserve', 'release', 'outbound', 'write_off']),
  quantity: z.number().int().positive(),
  referenceId: IdSchema.optional(),
  createdAt: z.string().datetime(),
});
export type StockMovement = z.infer<typeof StockMovementSchema>;

export const InventoryLotPageSchema = pageResult(InventoryLotSchema);
export type InventoryLotPage = z.infer<typeof InventoryLotPageSchema>;
