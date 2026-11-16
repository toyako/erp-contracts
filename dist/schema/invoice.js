"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicePageSchema = exports.CreateInvoiceRequestSchema = exports.InvoiceSchema = exports.INVOICE_TRANSITIONS = exports.InvoiceStatusSchema = exports.InvoiceTypeSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
/** 发票类型：增值税专票 / 增值税普票 / 收据 */
exports.InvoiceTypeSchema = zod_1.z.enum(['vat_special', 'vat_normal', 'receipt']);
/** 发票：draft -> issued -> voided；draft -> cancelled */
exports.InvoiceStatusSchema = zod_1.z.enum(['draft', 'issued', 'voided', 'cancelled']);
/** 显式状态机：终态不可回退，照抄退货单的做法 */
exports.INVOICE_TRANSITIONS = {
    draft: ['issued', 'cancelled'],
    issued: ['voided'],
    voided: [],
    cancelled: [],
};
/** 发票：一单可开多张（分次开票），累计金额不超过订单总额；只限已付款/已完成订单 */
exports.InvoiceSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    invoiceNo: zod_1.z.string(),
    orderId: common_1.IdSchema,
    orderNo: zod_1.z.string(),
    /** 散客订单无客户，存 null */
    customerId: common_1.IdSchema.nullable(),
    amount: common_1.MoneySchema,
    type: exports.InvoiceTypeSchema,
    /** 抬头：默认订单客户名，无客户时为“散客”，建单时可改 */
    title: zod_1.z.string(),
    status: exports.InvoiceStatusSchema,
    createdAt: zod_1.z.string(),
    issuedAt: zod_1.z.string().nullable(),
});
exports.CreateInvoiceRequestSchema = zod_1.z.object({
    orderId: common_1.IdSchema,
    /** 开票金额（分）：必须大于 0，且累计不超过订单总额（服务端校验） */
    amount: common_1.MoneySchema.refine((m) => m.amount > 0, '开票金额必须大于 0'),
    type: exports.InvoiceTypeSchema.optional(),
    title: zod_1.z.string().max(200, '抬头最多 200 字').optional(),
});
exports.InvoicePageSchema = (0, common_1.pageResult)(exports.InvoiceSchema);
