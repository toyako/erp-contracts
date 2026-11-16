"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferPageSchema = exports.CreateTransferRequestSchema = exports.RejectTransferRequestSchema = exports.TransferSchema = exports.TRANSFER_TRANSITIONS = exports.TransferStatusSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
/** 调拨：draft -> submitted -> approved -> completed；提交后可拒绝/取消；rejected 为终态 */
exports.TransferStatusSchema = zod_1.z.enum([
    'draft',
    'submitted',
    'approved',
    'rejected',
    'completed',
    'cancelled',
]);
/** 显式状态机：终态不可回退，照抄退货单的做法 */
exports.TRANSFER_TRANSITIONS = {
    draft: ['submitted', 'cancelled'],
    submitted: ['approved', 'rejected', 'cancelled'],
    approved: ['completed', 'cancelled'],
    rejected: [],
    completed: [],
    cancelled: [],
};
/** 调拨单：在两个仓库/库位之间移动一个 SKU 的库存，数量从源批次扣、往目标批次加 */
exports.TransferSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    transferNo: zod_1.z.string(),
    skuId: common_1.IdSchema,
    fromLocation: zod_1.z.string().min(1).max(32),
    toLocation: zod_1.z.string().min(1).max(32),
    quantity: zod_1.z.number().int().positive(),
    status: exports.TransferStatusSchema,
    /** 完成时实际动用的源批次号（FIFO 取批），draft 为 null；流水凭此定位批次 */
    batchCode: zod_1.z.string().nullable(),
    /** 拒绝原因：仅 rejected 状态下有值，由审核人在拒绝时填写 */
    rejectReason: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
    completedAt: zod_1.z.string().nullable(),
});
/** 拒绝调拨：原因必填（1–200 字），落库到 rejectReason */
exports.RejectTransferRequestSchema = zod_1.z.object({
    reason: zod_1.z.string().min(1, '拒绝原因不能为空').max(200, '拒绝原因最多 200 字'),
});
exports.CreateTransferRequestSchema = zod_1.z.object({
    skuId: common_1.IdSchema,
    fromLocation: zod_1.z.string().min(1, '源库位不能为空').max(32),
    toLocation: zod_1.z.string().min(1, '目标库位不能为空').max(32),
    quantity: zod_1.z.number().int().positive(),
});
exports.TransferPageSchema = (0, common_1.pageResult)(exports.TransferSchema);
