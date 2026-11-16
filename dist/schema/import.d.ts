import { z } from 'zod';
/** 导入单行问题：行号从 2 开始算（第 1 行是表头） */
export declare const ImportRowIssueSchema: z.ZodObject<{
    row: z.ZodNumber;
    reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reason: string;
    row: number;
}, {
    reason: string;
    row: number;
}>;
export type ImportRowIssue = z.infer<typeof ImportRowIssueSchema>;
/** 导入汇总：单行坏不影响整批，created 成功、skipped 可预期跳过、errors 需人工修 */
export declare const ImportResultSchema: z.ZodObject<{
    created: z.ZodNumber;
    skipped: z.ZodArray<z.ZodObject<{
        row: z.ZodNumber;
        reason: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        reason: string;
        row: number;
    }, {
        reason: string;
        row: number;
    }>, "many">;
    errors: z.ZodArray<z.ZodObject<{
        row: z.ZodNumber;
        reason: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        reason: string;
        row: number;
    }, {
        reason: string;
        row: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    created: number;
    skipped: {
        reason: string;
        row: number;
    }[];
    errors: {
        reason: string;
        row: number;
    }[];
}, {
    created: number;
    skipped: {
        reason: string;
        row: number;
    }[];
    errors: {
        reason: string;
        row: number;
    }[];
}>;
export type ImportResult = z.infer<typeof ImportResultSchema>;
