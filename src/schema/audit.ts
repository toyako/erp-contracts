import { z } from 'zod';
import { IdSchema, PageQueryParamsSchema, pageResult } from './common';

/**
 * 操作审计日志：由 AuditInterceptor 横切写接口自动记，不接业务 service。
 * actorId 未接真实鉴权时取 'admin'（请求头 x-actor 有值则取之）；
 * payload 只存请求体摘要（JSON 字符串，截断 500 字，密码类字段已脱敏）。
 */
export const AuditEventSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  actorId: z.string(),
  /** 动作：METHOD + path，如 'POST /customers'（不含 /api 前缀） */
  action: z.string(),
  /** 对象：从 path 首段推导，如 customers / sales-orders / purchase-orders */
  targetType: z.string(),
  /** 对象 id（响应体 id），取不到时为 null */
  targetId: IdSchema.nullable(),
  payload: z.object({ detail: z.string() }).nullable(),
  createdAt: z.string(),
});
export type AuditEvent = z.infer<typeof AuditEventSchema>;

export const AuditEventPageSchema = pageResult(AuditEventSchema);
export type AuditEventPage = z.infer<typeof AuditEventPageSchema>;

/** 审计列表查询：entity 精确匹配 targetType；action 子串匹配（如传 POST 即筛全部创建类操作） */
export const AuditEventListQuerySchema = PageQueryParamsSchema.extend({
  entity: z.string().optional(),
  action: z.string().optional(),
});
export type AuditEventListQuery = z.infer<typeof AuditEventListQuerySchema>;
