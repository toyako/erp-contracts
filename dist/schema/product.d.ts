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
    /** 成本价（分）：null = 未维护，毛利算不出；售价走价格档案，成本走 SKU 档案 */
    cost: z.ZodNullable<z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    code: string;
    id: string;
    enabled: boolean;
    spuId: string;
    spec: string;
    unit: string;
    cost: {
        amount: number;
        currency: string;
    } | null;
}, {
    code: string;
    id: string;
    enabled: boolean;
    spuId: string;
    spec: string;
    unit: string;
    cost: {
        amount: number;
        currency: string;
    } | null;
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
        /** 成本价（分）：null = 未维护，毛利算不出；售价走价格档案，成本走 SKU 档案 */
        cost: z.ZodNullable<z.ZodObject<{
            amount: z.ZodNumber;
            currency: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            amount: number;
            currency: string;
        }, {
            amount: number;
            currency: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        id: string;
        enabled: boolean;
        spuId: string;
        spec: string;
        unit: string;
        cost: {
            amount: number;
            currency: string;
        } | null;
    }, {
        code: string;
        id: string;
        enabled: boolean;
        spuId: string;
        spec: string;
        unit: string;
        cost: {
            amount: number;
            currency: string;
        } | null;
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
        cost: {
            amount: number;
            currency: string;
        } | null;
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
        cost: {
            amount: number;
            currency: string;
        } | null;
    }[];
    total: number;
}>;
export type SkuPage = z.infer<typeof SkuPageSchema>;
/** 新建 SKU：编码与所属 SPU 必填；SKU 本身不带价格，价格另走价格档案 */
export declare const CreateSkuRequestSchema: z.ZodObject<{
    spuId: z.ZodString;
    code: z.ZodString;
    spec: z.ZodString;
    unit: z.ZodString;
    enabled: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    code: string;
    enabled: boolean;
    spuId: string;
    spec: string;
    unit: string;
}, {
    code: string;
    spuId: string;
    spec: string;
    unit: string;
    enabled?: boolean | undefined;
}>;
export type CreateSkuRequest = z.input<typeof CreateSkuRequestSchema>;
export declare const PriceListPageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        id: string;
        skuId: string;
        channelCode: string;
        price: {
            amount: number;
            currency: string;
        };
        effectiveFrom: string;
        effectiveTo?: string | undefined;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        id: string;
        skuId: string;
        channelCode: string;
        price: {
            amount: number;
            currency: string;
        };
        effectiveFrom: string;
        effectiveTo?: string | undefined;
    }[];
    total: number;
}>;
export type PriceListPage = z.infer<typeof PriceListPageSchema>;
/**
 * 新建价格：channelCode 缺省为 'DIRECT'（与 Prisma 种子一致，线上在用的渠道码）；
 * effectiveFrom 缺省时服务端取当前时间。
 * 金额必须为正（MoneySchema 本身允许 0，价格档案里 0 元无意义）。
 */
export declare const CreatePriceRequestSchema: z.ZodObject<{
    skuId: z.ZodString;
    channelCode: z.ZodDefault<z.ZodString>;
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
    effectiveFrom: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    skuId: string;
    channelCode: string;
    price: {
        amount: number;
        currency: string;
    };
    effectiveFrom?: string | undefined;
}, {
    skuId: string;
    price: {
        amount: number;
        currency: string;
    };
    channelCode?: string | undefined;
    effectiveFrom?: string | undefined;
}>;
export type CreatePriceRequest = z.input<typeof CreatePriceRequestSchema>;
/** 改价：只改金额与/或截止时间；生效自、渠道与 SKU 不可改 */
export declare const UpdatePriceRequestSchema: z.ZodObject<{
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
    effectiveTo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    price?: {
        amount: number;
        currency: string;
    } | undefined;
    effectiveTo?: string | null | undefined;
}, {
    price?: {
        amount: number;
        currency: string;
    } | undefined;
    effectiveTo?: string | null | undefined;
}>;
export type UpdatePriceRequest = z.infer<typeof UpdatePriceRequestSchema>;
/** SKU 编辑：只传要改的字段，编码与所属 SPU 不可改；cost 传 null 表示清除成本价（回未维护） */
export declare const UpdateSkuRequestSchema: z.ZodObject<{
    spec: z.ZodOptional<z.ZodString>;
    unit: z.ZodOptional<z.ZodString>;
    enabled: z.ZodOptional<z.ZodBoolean>;
    cost: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>>>;
}, "strip", z.ZodTypeAny, {
    enabled?: boolean | undefined;
    spec?: string | undefined;
    unit?: string | undefined;
    cost?: {
        amount: number;
        currency: string;
    } | null | undefined;
}, {
    enabled?: boolean | undefined;
    spec?: string | undefined;
    unit?: string | undefined;
    cost?: {
        amount: number;
        currency: string;
    } | null | undefined;
}>;
export type UpdateSkuRequest = z.infer<typeof UpdateSkuRequestSchema>;
