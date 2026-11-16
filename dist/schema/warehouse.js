"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehousePageSchema = exports.UpdateWarehouseRequestSchema = exports.CreateWarehouseRequestSchema = exports.WarehouseSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
/**
 * 仓库档案：批次 location 存的就是仓库 code（'主仓'/'华东仓'与现有批次值兼容）；
 * 仓库只停用不真删（停用时有批次引用则 409）。
 */
exports.WarehouseSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    code: zod_1.z.string().min(1).max(64),
    name: zod_1.z.string().min(1).max(128),
    address: zod_1.z.string().max(256).optional(),
    enabled: zod_1.z.boolean(),
});
exports.CreateWarehouseRequestSchema = zod_1.z.object({
    code: zod_1.z.string().min(1).max(64),
    name: zod_1.z.string().min(1).max(128),
    address: zod_1.z.string().max(256).optional(),
});
exports.UpdateWarehouseRequestSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(128).optional(),
    address: zod_1.z.string().max(256).optional(),
    enabled: zod_1.z.boolean().optional(),
});
exports.WarehousePageSchema = (0, common_1.pageResult)(exports.WarehouseSchema);
