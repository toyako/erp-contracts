"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryPageSchema = exports.UpdateCategoryRequestSchema = exports.CreateCategoryRequestSchema = exports.CategoryTreeSchema = exports.CategoryTreeNodeSchema = exports.CategorySchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
/** 商品分类：树形，parentId 为 null 即根分类；code 全局唯一 */
exports.CategorySchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    code: zod_1.z.string().min(1).max(64),
    name: zod_1.z.string().min(1).max(128),
    parentId: zod_1.z.string().uuid().nullable(),
    sort: zod_1.z.number().int().nonnegative(),
    enabled: zod_1.z.boolean(),
});
exports.CategoryTreeNodeSchema = exports.CategorySchema.extend({
    children: zod_1.z.lazy(() => zod_1.z.array(exports.CategoryTreeNodeSchema)),
});
exports.CategoryTreeSchema = zod_1.z.array(exports.CategoryTreeNodeSchema);
exports.CreateCategoryRequestSchema = zod_1.z.object({
    code: zod_1.z.string().min(1).max(64),
    name: zod_1.z.string().min(1).max(128),
    parentId: zod_1.z.string().uuid().nullable().optional(),
    sort: zod_1.z.number().int().nonnegative().optional(),
});
exports.UpdateCategoryRequestSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(128).optional(),
    parentId: zod_1.z.string().uuid().nullable().optional(),
    sort: zod_1.z.number().int().nonnegative().optional(),
    enabled: zod_1.z.boolean().optional(),
});
exports.CategoryPageSchema = (0, common_1.pageResult)(exports.CategorySchema);
