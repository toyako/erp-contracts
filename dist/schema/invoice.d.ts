import { z } from 'zod';
/** 发票类型：增值税专票 / 增值税普票 / 收据 */
export declare const InvoiceTypeSchema: z.ZodEnum<["vat_special", "vat_normal", "receipt"]>;
export type InvoiceType = z.infer<typeof InvoiceTypeSchema>;
/** 发票：draft -> issued -> voided；draft -> cancelled */
export declare const InvoiceStatusSchema: z.ZodEnum<["draft", "issued", "voided", "cancelled"]>;
export type InvoiceStatus = z.infer<typeof InvoiceStatusSchema>;
/** 显式状态机：终态不可回退，照抄退货单的做法 */
export declare const INVOICE_TRANSITIONS: Record<InvoiceStatus, readonly InvoiceStatus[]>;
/** 发票：一单可开多张（分次开票），累计金额不超过订单总额；只限已付款/已完成订单 */
export declare const InvoiceSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    invoiceNo: z.ZodString;
    orderId: z.ZodString;
    orderNo: z.ZodString;
    /** 散客订单无客户，存 null */
    customerId: z.ZodNullable<z.ZodString>;
    amount: z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>;
    type: z.ZodEnum<["vat_special", "vat_normal", "receipt"]>;
    /** 抬头：默认订单客户名，无客户时为“散客”，建单时可改 */
    title: z.ZodString;
    status: z.ZodEnum<["draft", "issued", "voided", "cancelled"]>;
    createdAt: z.ZodString;
    issuedAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "vat_special" | "vat_normal" | "receipt";
    status: "draft" | "cancelled" | "issued" | "voided";
    amount: {
        amount: number;
        currency: string;
    };
    id: string;
    tenantId: string;
    orderId: string;
    createdAt: string;
    orderNo: string;
    customerId: string | null;
    invoiceNo: string;
    title: string;
    issuedAt: string | null;
}, {
    type: "vat_special" | "vat_normal" | "receipt";
    status: "draft" | "cancelled" | "issued" | "voided";
    amount: {
        amount: number;
        currency: string;
    };
    id: string;
    tenantId: string;
    orderId: string;
    createdAt: string;
    orderNo: string;
    customerId: string | null;
    invoiceNo: string;
    title: string;
    issuedAt: string | null;
}>;
export type Invoice = z.infer<typeof InvoiceSchema>;
export declare const CreateInvoiceRequestSchema: z.ZodObject<{
    orderId: z.ZodString;
    /** 开票金额（分）：必须大于 0，且累计不超过订单总额（服务端校验） */
    amount: z.ZodEffects<z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>, {
        amount: number;
        currency: string;
    }, {
        amount: number;
        currency: string;
    }>;
    type: z.ZodOptional<z.ZodEnum<["vat_special", "vat_normal", "receipt"]>>;
    title: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: {
        amount: number;
        currency: string;
    };
    orderId: string;
    type?: "vat_special" | "vat_normal" | "receipt" | undefined;
    title?: string | undefined;
}, {
    amount: {
        amount: number;
        currency: string;
    };
    orderId: string;
    type?: "vat_special" | "vat_normal" | "receipt" | undefined;
    title?: string | undefined;
}>;
export type CreateInvoiceRequest = z.infer<typeof CreateInvoiceRequestSchema>;
export declare const InvoicePageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        invoiceNo: z.ZodString;
        orderId: z.ZodString;
        orderNo: z.ZodString;
        /** 散客订单无客户，存 null */
        customerId: z.ZodNullable<z.ZodString>;
        amount: z.ZodObject<{
            amount: z.ZodNumber;
            currency: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            amount: number;
            currency: string;
        }, {
            amount: number;
            currency: string;
        }>;
        type: z.ZodEnum<["vat_special", "vat_normal", "receipt"]>;
        /** 抬头：默认订单客户名，无客户时为“散客”，建单时可改 */
        title: z.ZodString;
        status: z.ZodEnum<["draft", "issued", "voided", "cancelled"]>;
        createdAt: z.ZodString;
        issuedAt: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "vat_special" | "vat_normal" | "receipt";
        status: "draft" | "cancelled" | "issued" | "voided";
        amount: {
            amount: number;
            currency: string;
        };
        id: string;
        tenantId: string;
        orderId: string;
        createdAt: string;
        orderNo: string;
        customerId: string | null;
        invoiceNo: string;
        title: string;
        issuedAt: string | null;
    }, {
        type: "vat_special" | "vat_normal" | "receipt";
        status: "draft" | "cancelled" | "issued" | "voided";
        amount: {
            amount: number;
            currency: string;
        };
        id: string;
        tenantId: string;
        orderId: string;
        createdAt: string;
        orderNo: string;
        customerId: string | null;
        invoiceNo: string;
        title: string;
        issuedAt: string | null;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        type: "vat_special" | "vat_normal" | "receipt";
        status: "draft" | "cancelled" | "issued" | "voided";
        amount: {
            amount: number;
            currency: string;
        };
        id: string;
        tenantId: string;
        orderId: string;
        createdAt: string;
        orderNo: string;
        customerId: string | null;
        invoiceNo: string;
        title: string;
        issuedAt: string | null;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        type: "vat_special" | "vat_normal" | "receipt";
        status: "draft" | "cancelled" | "issued" | "voided";
        amount: {
            amount: number;
            currency: string;
        };
        id: string;
        tenantId: string;
        orderId: string;
        createdAt: string;
        orderNo: string;
        customerId: string | null;
        invoiceNo: string;
        title: string;
        issuedAt: string | null;
    }[];
    total: number;
}>;
export type InvoicePage = z.infer<typeof InvoicePageSchema>;
