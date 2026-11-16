import { z } from 'zod';
import { IdSchema, pageResult } from './common';

/** 商品分类：树形，parentId 为 null 即根分类；code 全局唯一 */
export const CategorySchema = z.object({
  id: IdSchema,
  tenantId: IdSchema,
  code: z.string().min(1).max(64),
  name: z.string().min(1).max(128),
  parentId: z.string().uuid().nullable(),
  sort: z.number().int().nonnegative(),
  enabled: z.boolean(),
});
export type Category = z.infer<typeof CategorySchema>;

export type CategoryTreeNode = Category & { children: CategoryTreeNode[] };
export const CategoryTreeNodeSchema: z.ZodType<CategoryTreeNode> = CategorySchema.extend({
  children: z.lazy(() => z.array(CategoryTreeNodeSchema)),
});
export const CategoryTreeSchema = z.array(CategoryTreeNodeSchema);

export const CreateCategoryRequestSchema = z.object({
  code: z.string().min(1).max(64),
  name: z.string().min(1).max(128),
  parentId: z.string().uuid().nullable().optional(),
  sort: z.number().int().nonnegative().optional(),
});
export type CreateCategoryRequest = z.infer<typeof CreateCategoryRequestSchema>;

export const UpdateCategoryRequestSchema = z.object({
  name: z.string().min(1).max(128).optional(),
  parentId: z.string().uuid().nullable().optional(),
  sort: z.number().int().nonnegative().optional(),
  enabled: z.boolean().optional(),
});
export type UpdateCategoryRequest = z.infer<typeof UpdateCategoryRequestSchema>;

export const CategoryPageSchema = pageResult(CategorySchema);
export type CategoryPage = z.infer<typeof CategoryPageSchema>;
