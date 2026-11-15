import { z } from 'zod';
import { IdSchema, MoneySchema, pageResult } from './common';

export const SpuSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  name: z.string().min(1).max(128),
  categoryCode: z.string().min(1).max(64),
  description: z.string().max(2000).optional(),
  enabled: z.boolean(),
});
export type Spu = z.infer<typeof SpuSchema>;

export const SkuSchema = z.object({
  id: IdSchema,
  spuId: IdSchema,
  code: z.string().min(1).max(64),
  spec: z.string().max(256),
  unit: z.string().min(1).max(32),
  enabled: z.boolean(),
});
export type Sku = z.infer<typeof SkuSchema>;

/** 价格由服务端维护，创建订单时客户端不得传金额 */
export const PriceListSchema = z.object({
  id: IdSchema,
  skuId: IdSchema,
  channelCode: z.string().min(1).max(64),
  price: MoneySchema,
  effectiveFrom: z.string().datetime(),
  effectiveTo: z.string().datetime().optional(),
});
export type PriceList = z.infer<typeof PriceListSchema>;

export const SkuPageSchema = pageResult(SkuSchema);
export type SkuPage = z.infer<typeof SkuPageSchema>;
