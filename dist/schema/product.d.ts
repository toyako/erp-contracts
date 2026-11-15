import { z } from 'zod';
export declare const SpuSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    name: z.ZodString;
    categoryCode: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    tenantId: string;
    name: string;
    categoryCode: string;
    enabled: boolean;
    description?: string | undefined;
}, {
    id: string;
    tenantId: string;
    name: string;
    categoryCode: string;
    enabled: boolean;
    description?: string | undefined;
}>;
export type Spu = z.infer<typeof SpuSchema>;
export declare const SkuSchema: z.ZodObject<{
    id: z.ZodString;
    spuId: z.ZodString;
    code: z.ZodString;
    spec: z.ZodString;
    unit: z.ZodString;
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    code: string;
    id: string;
    enabled: boolean;
    spuId: string;
    spec: string;
    unit: string;
}, {
    code: string;
    id: string;
    enabled: boolean;
    spuId: string;
    spec: string;
    unit: string;
}>;
export type Sku = z.infer<typeof SkuSchema>;
/** 价格由服务端维护，创建订单时客户端不得传金额 */
export declare const PriceListSchema: z.ZodObject<{
    id: z.ZodString;
    skuId: z.ZodString;
    channelCode: z.ZodString;
    price: z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>;
    effectiveFrom: z.ZodString;
    effectiveTo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    skuId: string;
    channelCode: string;
    price: {
        amount: number;
        currency: string;
    };
    effectiveFrom: string;
    effectiveTo?: string | undefined;
}, {
    id: string;
    skuId: string;
    channelCode: string;
    price: {
        amount: number;
        currency: string;
    };
    effectiveFrom: string;
    effectiveTo?: string | undefined;
}>;
export type PriceList = z.infer<typeof PriceListSchema>;
export declare const SkuPageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        spuId: z.ZodString;
        code: z.ZodString;
        spec: z.ZodString;
        unit: z.ZodString;
        enabled: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        code: string;
        id: string;
        enabled: boolean;
        spuId: string;
        spec: string;
        unit: string;
    }, {
        code: string;
        id: string;
        enabled: boolean;
        spuId: string;
        spec: string;
        unit: string;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        code: string;
        id: string;
        enabled: boolean;
        spuId: string;
        spec: string;
        unit: string;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        code: string;
        id: string;
        enabled: boolean;
        spuId: string;
        spec: string;
        unit: string;
    }[];
    total: number;
}>;
export type SkuPage = z.infer<typeof SkuPageSchema>;
/** SKU 编辑：只传要改的字段，编码与所属 SPU 不可改 */
export declare const UpdateSkuRequestSchema: z.ZodObject<{
    spec: z.ZodOptional<z.ZodString>;
    unit: z.ZodOptional<z.ZodString>;
    enabled: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    enabled?: boolean | undefined;
    spec?: string | undefined;
    unit?: string | undefined;
}, {
    enabled?: boolean | undefined;
    spec?: string | undefined;
    unit?: string | undefined;
}>;
export type UpdateSkuRequest = z.infer<typeof UpdateSkuRequestSchema>;
