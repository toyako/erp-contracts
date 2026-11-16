import { z } from 'zod';
export declare const IdSchema: z.ZodString;
export type Id = z.infer<typeof IdSchema>;
/** 金额以最小货币单位（分）表示，禁止浮点数 */
export declare const MoneySchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodString;
}, "strip", z.ZodTypeAny, {
    amount: number;
    currency: string;
}, {
    amount: number;
    currency: string;
}>;
export type Money = z.infer<typeof MoneySchema>;
export declare const PageQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
}, {
    page?: number | undefined;
    pageSize?: number | undefined;
}>;
export type PageQuery = z.infer<typeof PageQuerySchema>;
/** 供 @Query 使用：query 到 Nest 时是字符串，普通 z.number() 会拒收 */
export declare const PageQueryParamsSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
    /** 列表搜索关键字（按各接口约定的字段子串匹配，如客户编码/名称/电话） */
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    search?: string | undefined;
}, {
    page?: number | undefined;
    pageSize?: number | undefined;
    search?: string | undefined;
}>;
export type PageQueryParams = z.infer<typeof PageQueryParamsSchema>;
export declare const pageResult: <T extends z.ZodTypeAny>(item: T) => z.ZodObject<{
    items: z.ZodArray<T, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: T["_output"][];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: T["_input"][];
    total: number;
}>;
export declare const ErrorCodeSchema: z.ZodEnum<["VALIDATION_FAILED", "UNAUTHENTICATED", "FORBIDDEN", "NOT_FOUND", "CONFLICT", "INSUFFICIENT_STOCK", "INVALID_STATE", "INTERNAL"]>;
export type ErrorCode = z.infer<typeof ErrorCodeSchema>;
export declare const ApiErrorSchema: z.ZodObject<{
    code: z.ZodEnum<["VALIDATION_FAILED", "UNAUTHENTICATED", "FORBIDDEN", "NOT_FOUND", "CONFLICT", "INSUFFICIENT_STOCK", "INVALID_STATE", "INTERNAL"]>;
    message: z.ZodString;
    traceId: z.ZodOptional<z.ZodString>;
    details: z.ZodOptional<z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    code: "VALIDATION_FAILED" | "UNAUTHENTICATED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "INSUFFICIENT_STOCK" | "INVALID_STATE" | "INTERNAL";
    message: string;
    traceId?: string | undefined;
    details?: unknown;
}, {
    code: "VALIDATION_FAILED" | "UNAUTHENTICATED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "INSUFFICIENT_STOCK" | "INVALID_STATE" | "INTERNAL";
    message: string;
    traceId?: string | undefined;
    details?: unknown;
}>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
