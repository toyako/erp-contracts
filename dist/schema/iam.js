"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrincipalPageSchema = exports.LoginResponseSchema = exports.LoginRequestSchema = exports.PrincipalSchema = exports.RoleSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
exports.RoleSchema = zod_1.z.enum(['admin', 'sales', 'readonly']);
exports.PrincipalSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    username: zod_1.z.string().min(1).max(64),
    displayName: zod_1.z.string().min(1).max(64),
    roles: zod_1.z.array(exports.RoleSchema).min(1),
});
exports.LoginRequestSchema = zod_1.z.object({
    username: zod_1.z.string().min(1).max(64),
    password: zod_1.z.string().min(1).max(128),
});
exports.LoginResponseSchema = zod_1.z.object({
    accessToken: zod_1.z.string().min(1),
    expiresIn: zod_1.z.number().int().positive(),
    principal: exports.PrincipalSchema,
});
exports.PrincipalPageSchema = (0, common_1.pageResult)(exports.PrincipalSchema);
