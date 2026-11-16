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

/** 新建 SKU：编码与所属 SPU 必填；SKU 本身不带价格，价格另走价格档案 */
export const CreateSkuRequestSchema = z.object({
  spuId: IdSchema,
  code: z.string().min(1).max(64),
  spec: z.string().max(256),
  unit: z.string().min(1).max(32),
  enabled: z.boolean().default(true),
});
export type CreateSkuRequest = z.input<typeof CreateSkuRequestSchema>;

export const PriceListPageSchema = pageResult(PriceListSchema);
export type PriceListPage = z.infer<typeof PriceListPageSchema>;

/**
 * 新建价格：channelCode 缺省为 'default'；effectiveFrom 缺省时服务端取当前时间。
 * 金额必须为正（MoneySchema 本身允许 0，价格档案里 0 元无意义）。
 */
export const CreatePriceRequestSchema = z.object({
  skuId: IdSchema,
  channelCode: z.string().min(1).max(64).default('default'),
  price: z.object({
    amount: z.number().int().positive(),
    currency: z.string().length(3),
  }),
  effectiveFrom: z.string().datetime().optional(),
});
export type CreatePriceRequest = z.input<typeof CreatePriceRequestSchema>;

/** 改价：只改金额与/或截止时间；生效自、渠道与 SKU 不可改 */
export const UpdatePriceRequestSchema = z.object({
  price: z
    .object({
      amount: z.number().int().positive(),
      currency: z.string().length(3),
    })
    .optional(),
  effectiveTo: z.string().datetime().nullable().optional(),
});
export type UpdatePriceRequest = z.infer<typeof UpdatePriceRequestSchema>;

/** SKU 编辑：只传要改的字段，编码与所属 SPU 不可改 */
export const UpdateSkuRequestSchema = z.object({
  spec: z.string().max(256).optional(),
  unit: z.string().min(1).max(32).optional(),
  enabled: z.boolean().optional(),
});
export type UpdateSkuRequest = z.infer<typeof UpdateSkuRequestSchema>;
