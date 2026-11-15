import { z } from 'zod';
import { IdSchema, pageResult } from './common';

export const RoleSchema = z.enum(['admin', 'sales', 'readonly']);
export type Role = z.infer<typeof RoleSchema>;

export const PrincipalSchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  username: z.string().min(1).max(64),
  displayName: z.string().min(1).max(64),
  roles: z.array(RoleSchema).min(1),
});
export type Principal = z.infer<typeof PrincipalSchema>;

export const LoginRequestSchema = z.object({
  username: z.string().min(1).max(64),
  password: z.string().min(1).max(128),
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  accessToken: z.string().min(1),
  expiresIn: z.number().int().positive(),
  principal: PrincipalSchema,
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const PrincipalPageSchema = pageResult(PrincipalSchema);
export type PrincipalPage = z.infer<typeof PrincipalPageSchema>;
