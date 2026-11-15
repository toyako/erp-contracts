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
