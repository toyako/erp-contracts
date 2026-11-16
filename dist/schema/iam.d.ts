import { z } from 'zod';
export declare const RoleSchema: z.ZodEnum<["admin", "sales", "readonly"]>;
export type Role = z.infer<typeof RoleSchema>;
export declare const PrincipalSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    username: z.ZodString;
    displayName: z.ZodString;
    roles: z.ZodArray<z.ZodEnum<["admin", "sales", "readonly"]>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    tenantId: string;
    username: string;
    displayName: string;
    roles: ("admin" | "sales" | "readonly")[];
}, {
    id: string;
    tenantId: string;
    username: string;
    displayName: string;
    roles: ("admin" | "sales" | "readonly")[];
}>;
export type Principal = z.infer<typeof PrincipalSchema>;
export declare const LoginRequestSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export declare const LoginResponseSchema: z.ZodObject<{
    accessToken: z.ZodString;
    expiresIn: z.ZodNumber;
    principal: z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        username: z.ZodString;
        displayName: z.ZodString;
        roles: z.ZodArray<z.ZodEnum<["admin", "sales", "readonly"]>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        tenantId: string;
        username: string;
        displayName: string;
        roles: ("admin" | "sales" | "readonly")[];
    }, {
        id: string;
        tenantId: string;
        username: string;
        displayName: string;
        roles: ("admin" | "sales" | "readonly")[];
    }>;
}, "strip", z.ZodTypeAny, {
    accessToken: string;
    expiresIn: number;
    principal: {
        id: string;
        tenantId: string;
        username: string;
        displayName: string;
        roles: ("admin" | "sales" | "readonly")[];
    };
}, {
    accessToken: string;
    expiresIn: number;
    principal: {
        id: string;
        tenantId: string;
        username: string;
        displayName: string;
        roles: ("admin" | "sales" | "readonly")[];
    };
}>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export declare const PrincipalPageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        username: z.ZodString;
        displayName: z.ZodString;
        roles: z.ZodArray<z.ZodEnum<["admin", "sales", "readonly"]>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        tenantId: string;
        username: string;
        displayName: string;
        roles: ("admin" | "sales" | "readonly")[];
    }, {
        id: string;
        tenantId: string;
        username: string;
        displayName: string;
        roles: ("admin" | "sales" | "readonly")[];
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
        username: string;
        displayName: string;
        roles: ("admin" | "sales" | "readonly")[];
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        id: string;
        tenantId: string;
        username: string;
        displayName: string;
        roles: ("admin" | "sales" | "readonly")[];
    }[];
    total: number;
}>;
export type PrincipalPage = z.infer<typeof PrincipalPageSchema>;
/** 新建用户：密码最短 6 位；角色至少一个 */
export declare const CreatePrincipalRequestSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    displayName: z.ZodString;
    roles: z.ZodArray<z.ZodEnum<["admin", "sales", "readonly"]>, "many">;
}, "strip", z.ZodTypeAny, {
    username: string;
    displayName: string;
    roles: ("admin" | "sales" | "readonly")[];
    password: string;
}, {
    username: string;
    displayName: string;
    roles: ("admin" | "sales" | "readonly")[];
    password: string;
}>;
export type CreatePrincipalRequest = z.infer<typeof CreatePrincipalRequestSchema>;
/** 改用户：姓名 / 角色 / 密码按需改，空改由服务端报 400；用户名不可改 */
export declare const UpdatePrincipalRequestSchema: z.ZodObject<{
    displayName: z.ZodOptional<z.ZodString>;
    roles: z.ZodOptional<z.ZodArray<z.ZodEnum<["admin", "sales", "readonly"]>, "many">>;
    password: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    displayName?: string | undefined;
    roles?: ("admin" | "sales" | "readonly")[] | undefined;
    password?: string | undefined;
}, {
    displayName?: string | undefined;
    roles?: ("admin" | "sales" | "readonly")[] | undefined;
    password?: string | undefined;
}>;
export type UpdatePrincipalRequest = z.infer<typeof UpdatePrincipalRequestSchema>;
