import { z } from 'zod';
import { IdSchema, MoneySchema, pageResult } from './common';

/**
 * 阶梯价 / 批发价：同一（skuId, channelCode）下 minQty 唯一；
 * 取价 = 满足 minQty ≤ 数量的档中 minQty 最大的一条，无匹配档回落到 PriceList 现行价。
 */
export const PriceTierSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  skuId: IdSchema,
  channelCode: z.string().min(1).max(64),
  minQty: z.number().int().min(1),
  price: MoneySchema,
  enabled: z.boolean(),
});
export type PriceTier = z.infer<typeof PriceTierSchema>;

export const CreatePriceTierRequestSchema = z.object({
  skuId: IdSchema,
  channelCode: z.string().min(1).max(64).optional(),
  minQty: z.number().int().min(1),
  price: MoneySchema,
});
export type CreatePriceTierRequest = z.infer<typeof CreatePriceTierRequestSchema>;

export const UpdatePriceTierRequestSchema = z.object({
  minQty: z.number().int().min(1).optional(),
  price: MoneySchema.optional(),
  enabled: z.boolean().optional(),
});
export type UpdatePriceTierRequest = z.infer<typeof UpdatePriceTierRequestSchema>;

export const PriceTierPageSchema = pageResult(PriceTierSchema);
export type PriceTierPage = z.infer<typeof PriceTierPageSchema>;

export const PriceTierListQuerySchema = z.object({
  skuId: z.string().uuid().optional(),
});
export type PriceTierListQuery = z.infer<typeof PriceTierListQuerySchema>;

export const ResolvePriceQuerySchema = z.object({
  skuId: z.string().uuid(),
  quantity: z.coerce.number().int().min(1),
  channelCode: z.string().min(1).max(64).optional(),
});
export type ResolvePriceQuery = z.infer<typeof ResolvePriceQuerySchema>;

export const ResolvePriceResultSchema = z.object({
  skuId: IdSchema,
  quantity: z.number().int().min(1),
  /** 命中的阶梯档（null = 无档，回落现行价） */
  tier: PriceTierSchema.nullable(),
  price: MoneySchema,
});
export type ResolvePriceResult = z.infer<typeof ResolvePriceResultSchema>;
