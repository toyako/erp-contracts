"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentPageSchema = exports.ShipShipmentRequestSchema = exports.CreateShipmentRequestSchema = exports.ShipmentSchema = exports.ShipmentLineSchema = exports.SHIPMENT_TRANSITIONS = exports.ShipmentStatusSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
/** 发货单：draft -> picking -> packed -> shipped -> delivered；draft/picking/packed -> cancelled */
exports.ShipmentStatusSchema = zod_1.z.enum(['draft', 'picking', 'packed', 'shipped', 'delivered', 'cancelled']);
/** 显式状态机：终态不可回退，照抄退货单的做法 */
exports.SHIPMENT_TRANSITIONS = {
    draft: ['picking', 'cancelled'],
    picking: ['packed', 'cancelled'],
    packed: ['shipped', 'cancelled'],
    shipped: ['delivered'],
    delivered: [],
    cancelled: [],
};
exports.ShipmentLineSchema = zod_1.z.object({
    skuId: common_1.IdSchema,
    quantity: zod_1.z.number().int().positive(),
    /** 拣货时回填：履约扣数的同一批次（findLotBySku 的批次） */
    batchCode: zod_1.z.string().nullable(),
});
/** 发货单：一单只针对一个销售订单，行照抄订单行 */
exports.ShipmentSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    shipmentNo: zod_1.z.string(),
    orderId: common_1.IdSchema,
    orderNo: zod_1.z.string(),
    status: exports.ShipmentStatusSchema,
    lines: zod_1.z.array(exports.ShipmentLineSchema),
    /** 承运商与物流单号：发货时必填 */
    carrier: zod_1.z.string().nullable(),
    trackingNo: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
    shippedAt: zod_1.z.string().nullable(),
    deliveredAt: zod_1.z.string().nullable(),
});
exports.CreateShipmentRequestSchema = zod_1.z.object({
    orderId: common_1.IdSchema,
});
/** 发货：承运商与物流单号必填 */
exports.ShipShipmentRequestSchema = zod_1.z.object({
    carrier: zod_1.z.string().min(1, '承运商不能为空').max(64),
    trackingNo: zod_1.z.string().min(1, '物流单号不能为空').max(64),
});
exports.ShipmentPageSchema = (0, common_1.pageResult)(exports.ShipmentSchema);
