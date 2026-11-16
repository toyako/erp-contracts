import { z } from 'zod';
import { IdSchema, pageResult } from './common';

/**
 * 仓库档案：批次 location 存的就是仓库 code（'主仓'/'华东仓'与现有批次值兼容）；
 * 仓库只停用不真删（停用时有批次引用则 409）。
 */
export const WarehouseSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  code: z.string().min(1).max(64),
  name: z.string().min(1).max(128),
  address: z.string().max(256).optional(),
  enabled: z.boolean(),
});
export type Warehouse = z.infer<typeof WarehouseSchema>;

export const CreateWarehouseRequestSchema = z.object({
  code: z.string().min(1).max(64),
  name: z.string().min(1).max(128),
  address: z.string().max(256).optional(),
});
export type CreateWarehouseRequest = z.infer<typeof CreateWarehouseRequestSchema>;

export const UpdateWarehouseRequestSchema = z.object({
  name: z.string().min(1).max(128).optional(),
  address: z.string().max(256).optional(),
  enabled: z.boolean().optional(),
});
export type UpdateWarehouseRequest = z.infer<typeof UpdateWarehouseRequestSchema>;

export const WarehousePageSchema = pageResult(WarehouseSchema);
export type WarehousePage = z.infer<typeof WarehousePageSchema>;
