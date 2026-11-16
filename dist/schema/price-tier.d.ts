import { z } from 'zod';
/**
 * 阶梯价 / 批发价：同一（skuId, channelCode）下 minQty 唯一；
 * 取价 = 满足 minQty ≤ 数量的档中 minQty 最大的一条，无匹配档回落到 PriceList 现行价。
 */
export declare const PriceTierSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    skuId: z.ZodString;
    channelCode: z.ZodString;
    minQty: z.ZodNumber;
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
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    tenantId: string;
    enabled: boolean;
    skuId: string;
    channelCode: string;
    price: {
        amount: number;
        currency: string;
    };
    minQty: number;
}, {
    id: string;
    tenantId: string;
    enabled: boolean;
    skuId: string;
    channelCode: string;
    price: {
        amount: number;
        currency: string;
    };
    minQty: number;
}>;
export type PriceTier = z.infer<typeof PriceTierSchema>;
export declare const CreatePriceTierRequestSchema: z.ZodObject<{
    skuId: z.ZodString;
    channelCode: z.ZodOptional<z.ZodString>;
    minQty: z.ZodNumber;
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
}, "strip", z.ZodTypeAny, {
    skuId: string;
    price: {
        amount: number;
        currency: string;
    };
    minQty: number;
    channelCode?: string | undefined;
}, {
    skuId: string;
    price: {
        amount: number;
        currency: string;
    };
    minQty: number;
    channelCode?: string | undefined;
}>;
export type CreatePriceTierRequest = z.infer<typeof CreatePriceTierRequestSchema>;
export declare const UpdatePriceTierRequestSchema: z.ZodObject<{
    minQty: z.ZodOptional<z.ZodNumber>;
    price: z.ZodOptional<z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>>;
    enabled: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    enabled?: boolean | undefined;
    price?: {
        amount: number;
        currency: string;
    } | undefined;
    minQty?: number | undefined;
}, {
    enabled?: boolean | undefined;
    price?: {
        amount: number;
        currency: string;
    } | undefined;
    minQty?: number | undefined;
}>;
export type UpdatePriceTierRequest = z.infer<typeof UpdatePriceTierRequestSchema>;
export declare const PriceTierPageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        skuId: z.ZodString;
        channelCode: z.ZodString;
        minQty: z.ZodNumber;
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
        enabled: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        id: string;
        tenantId: string;
        enabled: boolean;
        skuId: string;
        channelCode: string;
        price: {
            amount: number;
            currency: string;
        };
        minQty: number;
    }, {
        id: string;
        tenantId: string;
        enabled: boolean;
        skuId: string;
        channelCode: string;
        price: {
            amount: number;
            currency: string;
        };
        minQty: number;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        id: string;
        tenantId: string;
        enabled: boolean;
        skuId: string;
        channelCode: string;
        price: {
            amount: number;
            currency: string;
        };
        minQty: number;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        id: string;
        tenantId: string;
        enabled: boolean;
        skuId: string;
        channelCode: string;
        price: {
            amount: number;
            currency: string;
        };
        minQty: number;
    }[];
    total: number;
}>;
export type PriceTierPage = z.infer<typeof PriceTierPageSchema>;
export declare const PriceTierListQuerySchema: z.ZodObject<{
    skuId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    skuId?: string | undefined;
}, {
    skuId?: string | undefined;
}>;
export type PriceTierListQuery = z.infer<typeof PriceTierListQuerySchema>;
export declare const ResolvePriceQuerySchema: z.ZodObject<{
    skuId: z.ZodString;
    quantity: z.ZodNumber;
    channelCode: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    skuId: string;
    quantity: number;
    channelCode?: string | undefined;
}, {
    skuId: string;
    quantity: number;
    channelCode?: string | undefined;
}>;
export type ResolvePriceQuery = z.infer<typeof ResolvePriceQuerySchema>;
export declare const ResolvePriceResultSchema: z.ZodObject<{
    skuId: z.ZodString;
    quantity: z.ZodNumber;
    /** 命中的阶梯档（null = 无档，回落现行价） */
    tier: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        skuId: z.ZodString;
        channelCode: z.ZodString;
        minQty: z.ZodNumber;
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
        enabled: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        id: string;
        tenantId: string;
        enabled: boolean;
        skuId: string;
        channelCode: string;
        price: {
            amount: number;
            currency: string;
        };
        minQty: number;
    }, {
        id: string;
        tenantId: string;
        enabled: boolean;
        skuId: string;
        channelCode: string;
        price: {
            amount: number;
            currency: string;
        };
        minQty: number;
    }>>;
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
}, "strip", z.ZodTypeAny, {
    skuId: string;
    price: {
        amount: number;
        currency: string;
    };
    quantity: number;
    tier: {
        id: string;
        tenantId: string;
        enabled: boolean;
        skuId: string;
        channelCode: string;
        price: {
            amount: number;
            currency: string;
        };
        minQty: number;
    } | null;
}, {
    skuId: string;
    price: {
        amount: number;
        currency: string;
    };
    quantity: number;
    tier: {
        id: string;
        tenantId: string;
        enabled: boolean;
        skuId: string;
        channelCode: string;
        price: {
            amount: number;
            currency: string;
        };
        minQty: number;
    } | null;
}>;
export type ResolvePriceResult = z.infer<typeof ResolvePriceResultSchema>;
