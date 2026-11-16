import { z } from 'zod';
/**
 * 仓库档案：批次 location 存的就是仓库 code（'主仓'/'华东仓'与现有批次值兼容）；
 * 仓库只停用不真删（停用时有批次引用则 409）。
 */
export declare const WarehouseSchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    code: z.ZodString;
    name: z.ZodString;
    address: z.ZodOptional<z.ZodString>;
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    code: string;
    id: string;
    tenantId: string;
    name: string;
    enabled: boolean;
    address?: string | undefined;
}, {
    code: string;
    id: string;
    tenantId: string;
    name: string;
    enabled: boolean;
    address?: string | undefined;
}>;
export type Warehouse = z.infer<typeof WarehouseSchema>;
export declare const CreateWarehouseRequestSchema: z.ZodObject<{
    code: z.ZodString;
    name: z.ZodString;
    address: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: string;
    name: string;
    address?: string | undefined;
}, {
    code: string;
    name: string;
    address?: string | undefined;
}>;
export type CreateWarehouseRequest = z.infer<typeof CreateWarehouseRequestSchema>;
export declare const UpdateWarehouseRequestSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    enabled: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    enabled?: boolean | undefined;
    address?: string | undefined;
}, {
    name?: string | undefined;
    enabled?: boolean | undefined;
    address?: string | undefined;
}>;
export type UpdateWarehouseRequest = z.infer<typeof UpdateWarehouseRequestSchema>;
export declare const WarehousePageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        code: z.ZodString;
        name: z.ZodString;
        address: z.ZodOptional<z.ZodString>;
        enabled: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        code: string;
        id: string;
        tenantId: string;
        name: string;
        enabled: boolean;
        address?: string | undefined;
    }, {
        code: string;
        id: string;
        tenantId: string;
        name: string;
        enabled: boolean;
        address?: string | undefined;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        code: string;
        id: string;
        tenantId: string;
        name: string;
        enabled: boolean;
        address?: string | undefined;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        code: string;
        id: string;
        tenantId: string;
        name: string;
        enabled: boolean;
        address?: string | undefined;
    }[];
    total: number;
}>;
export type WarehousePage = z.infer<typeof WarehousePageSchema>;
