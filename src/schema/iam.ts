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

/** 新建用户：密码最短 6 位；角色至少一个 */
export const CreatePrincipalRequestSchema = z.object({
  username: z.string().min(1).max(64),
  password: z.string().min(6).max(128),
  displayName: z.string().min(1).max(64),
  roles: z.array(RoleSchema).min(1),
});
export type CreatePrincipalRequest = z.infer<typeof CreatePrincipalRequestSchema>;

/** 改用户：姓名 / 角色 / 密码按需改，空改由服务端报 400；用户名不可改 */
export const UpdatePrincipalRequestSchema = z.object({
  displayName: z.string().min(1).max(64).optional(),
  roles: z.array(RoleSchema).min(1).optional(),
  password: z.string().min(6).max(128).optional(),
});
export type UpdatePrincipalRequest = z.infer<typeof UpdatePrincipalRequestSchema>;
