import { z } from 'zod';

export const IdSchema = z.string().uuid();
export type Id = z.infer<typeof IdSchema>;

/** 金额以最小货币单位（分）表示，禁止浮点数 */
export const MoneySchema = z.object({
  amount: z.number().int().nonnegative(),
  currency: z.string().length(3),
});
export type Money = z.infer<typeof MoneySchema>;

export const PageQuerySchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(200).default(20),
});
export type PageQuery = z.infer<typeof PageQuerySchema>;

export const pageResult = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    items: z.array(item),
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    pageSize: z.number().int().positive(),
  });

export const ErrorCodeSchema = z.enum([
  'VALIDATION_FAILED',
  'UNAUTHENTICATED',
  'FORBIDDEN',
  'NOT_FOUND',
  'CONFLICT',
  'INSUFFICIENT_STOCK',
  'INVALID_STATE',
  'INTERNAL',
]);
export type ErrorCode = z.infer<typeof ErrorCodeSchema>;

export const ApiErrorSchema = z.object({
  code: ErrorCodeSchema,
  message: z.string(),
  traceId: z.string().optional(),
  details: z.unknown().optional(),
});
export type ApiError = z.infer<typeof ApiErrorSchema>;
