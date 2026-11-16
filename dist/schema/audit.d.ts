import { z } from 'zod';
/**
 * 操作审计日志：由 AuditInterceptor 横切写接口自动记，不接业务 service。
 * actorId 未接真实鉴权时取 'admin'（请求头 x-actor 有值则取之）；
 * payload 只存请求体摘要（JSON 字符串，截断 500 字，密码类字段已脱敏）。
 */
export declare const AuditEventSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    actorId: z.ZodString;
    /** 动作：METHOD + path，如 'POST /customers'（不含 /api 前缀） */
    action: z.ZodString;
    /** 对象：从 path 首段推导，如 customers / sales-orders / purchase-orders */
    targetType: z.ZodString;
    /** 业务单号：响应体里的 rmaNo / transferNo / stocktakeNo / orderNo / code，取不到时退回 id，再取不到为 null */
    targetId: z.ZodNullable<z.ZodString>;
    payload: z.ZodNullable<z.ZodObject<{
        detail: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        detail: string;
    }, {
        detail: string;
    }>>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    tenantId: string;
    createdAt: string;
    action: string;
    actorId: string;
    targetType: string;
    targetId: string | null;
    payload: {
        detail: string;
    } | null;
}, {
    id: string;
    tenantId: string;
    createdAt: string;
    action: string;
    actorId: string;
    targetType: string;
    targetId: string | null;
    payload: {
        detail: string;
    } | null;
}>;
export type AuditEvent = z.infer<typeof AuditEventSchema>;
export declare const AuditEventPageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        actorId: z.ZodString;
        /** 动作：METHOD + path，如 'POST /customers'（不含 /api 前缀） */
        action: z.ZodString;
        /** 对象：从 path 首段推导，如 customers / sales-orders / purchase-orders */
        targetType: z.ZodString;
        /** 业务单号：响应体里的 rmaNo / transferNo / stocktakeNo / orderNo / code，取不到时退回 id，再取不到为 null */
        targetId: z.ZodNullable<z.ZodString>;
        payload: z.ZodNullable<z.ZodObject<{
            detail: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            detail: string;
        }, {
            detail: string;
        }>>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        tenantId: string;
        createdAt: string;
        action: string;
        actorId: string;
        targetType: string;
        targetId: string | null;
        payload: {
            detail: string;
        } | null;
    }, {
        id: string;
        tenantId: string;
        createdAt: string;
        action: string;
        actorId: string;
        targetType: string;
        targetId: string | null;
        payload: {
            detail: string;
        } | null;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        id: string;
        tenantId: string;
        createdAt: string;
        action: string;
        actorId: string;
        targetType: string;
        targetId: string | null;
        payload: {
            detail: string;
        } | null;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        id: string;
        tenantId: string;
        createdAt: string;
        action: string;
        actorId: string;
        targetType: string;
        targetId: string | null;
        payload: {
            detail: string;
        } | null;
    }[];
    total: number;
}>;
export type AuditEventPage = z.infer<typeof AuditEventPageSchema>;
/** 审计列表查询：entity 精确匹配 targetType；action 子串匹配（如传 POST 即筛全部创建类操作） */
export declare const AuditEventListQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
} & {
    entity: z.ZodOptional<z.ZodString>;
    action: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    search?: string | undefined;
    action?: string | undefined;
    entity?: string | undefined;
}, {
    page?: number | undefined;
    pageSize?: number | undefined;
    search?: string | undefined;
    action?: string | undefined;
    entity?: string | undefined;
}>;
export type AuditEventListQuery = z.infer<typeof AuditEventListQuerySchema>;
