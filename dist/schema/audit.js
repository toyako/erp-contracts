"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditEventListQuerySchema = exports.AuditEventPageSchema = exports.AuditEventSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
/**
 * 操作审计日志：由 AuditInterceptor 横切写接口自动记，不接业务 service。
 * actorId 未接真实鉴权时取 'admin'（请求头 x-actor 有值则取之）；
 * payload 只存请求体摘要（JSON 字符串，截断 500 字，密码类字段已脱敏）。
 */
exports.AuditEventSchema = zod_1.z.object({
    id: common_1.IdSchema,
    tenantId: common_1.IdSchema,
    actorId: zod_1.z.string(),
    /** 动作：METHOD + path，如 'POST /customers'（不含 /api 前缀） */
    action: zod_1.z.string(),
    /** 对象：从 path 首段推导，如 customers / sales-orders / purchase-orders */
    targetType: zod_1.z.string(),
    /** 业务单号：响应体里的 rmaNo / transferNo / stocktakeNo / orderNo / code，取不到时退回 id，再取不到为 null */
    targetId: common_1.IdSchema.nullable(),
    payload: zod_1.z.object({ detail: zod_1.z.string() }).nullable(),
    createdAt: zod_1.z.string(),
});
exports.AuditEventPageSchema = (0, common_1.pageResult)(exports.AuditEventSchema);
/** 审计列表查询：entity 精确匹配 targetType；action 子串匹配（如传 POST 即筛全部创建类操作） */
exports.AuditEventListQuerySchema = common_1.PageQueryParamsSchema.extend({
    entity: zod_1.z.string().optional(),
    action: zod_1.z.string().optional(),
});
