import { z } from 'zod';

/** 导入单行问题：行号从 2 开始算（第 1 行是表头） */
export const ImportRowIssueSchema = z.object({
  row: z.number().int().positive(),
  reason: z.string(),
});
export type ImportRowIssue = z.infer<typeof ImportRowIssueSchema>;

/** 导入汇总：单行坏不影响整批，created 成功、skipped 可预期跳过、errors 需人工修 */
export const ImportResultSchema = z.object({
  created: z.number().int().nonnegative(),
  skipped: z.array(ImportRowIssueSchema),
  errors: z.array(ImportRowIssueSchema),
});
export type ImportResult = z.infer<typeof ImportResultSchema>;
