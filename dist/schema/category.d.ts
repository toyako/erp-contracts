import { z } from 'zod';
/** 商品分类：树形，parentId 为 null 即根分类；code 全局唯一 */
export declare const CategorySchema: z.ZodObject<{
    id: z.ZodString;
    tenantId: z.ZodString;
    code: z.ZodString;
    name: z.ZodString;
    parentId: z.ZodNullable<z.ZodString>;
    sort: z.ZodNumber;
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    sort: number;
    code: string;
    id: string;
    tenantId: string;
    name: string;
    enabled: boolean;
    parentId: string | null;
}, {
    sort: number;
    code: string;
    id: string;
    tenantId: string;
    name: string;
    enabled: boolean;
    parentId: string | null;
}>;
export type Category = z.infer<typeof CategorySchema>;
export type CategoryTreeNode = Category & {
    children: CategoryTreeNode[];
};
export declare const CategoryTreeNodeSchema: z.ZodType<CategoryTreeNode>;
export declare const CategoryTreeSchema: z.ZodArray<z.ZodType<CategoryTreeNode, z.ZodTypeDef, CategoryTreeNode>, "many">;
export declare const CreateCategoryRequestSchema: z.ZodObject<{
    code: z.ZodString;
    name: z.ZodString;
    parentId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sort: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    code: string;
    name: string;
    sort?: number | undefined;
    parentId?: string | null | undefined;
}, {
    code: string;
    name: string;
    sort?: number | undefined;
    parentId?: string | null | undefined;
}>;
export type CreateCategoryRequest = z.infer<typeof CreateCategoryRequestSchema>;
export declare const UpdateCategoryRequestSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sort: z.ZodOptional<z.ZodNumber>;
    enabled: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    sort?: number | undefined;
    name?: string | undefined;
    enabled?: boolean | undefined;
    parentId?: string | null | undefined;
}, {
    sort?: number | undefined;
    name?: string | undefined;
    enabled?: boolean | undefined;
    parentId?: string | null | undefined;
}>;
export type UpdateCategoryRequest = z.infer<typeof UpdateCategoryRequestSchema>;
export declare const CategoryPageSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tenantId: z.ZodString;
        code: z.ZodString;
        name: z.ZodString;
        parentId: z.ZodNullable<z.ZodString>;
        sort: z.ZodNumber;
        enabled: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        sort: number;
        code: string;
        id: string;
        tenantId: string;
        name: string;
        enabled: boolean;
        parentId: string | null;
    }, {
        sort: number;
        code: string;
        id: string;
        tenantId: string;
        name: string;
        enabled: boolean;
        parentId: string | null;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: {
        sort: number;
        code: string;
        id: string;
        tenantId: string;
        name: string;
        enabled: boolean;
        parentId: string | null;
    }[];
    total: number;
}, {
    page: number;
    pageSize: number;
    items: {
        sort: number;
        code: string;
        id: string;
        tenantId: string;
        name: string;
        enabled: boolean;
        parentId: string | null;
    }[];
    total: number;
}>;
export type CategoryPage = z.infer<typeof CategoryPageSchema>;
