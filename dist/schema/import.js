"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportResultSchema = exports.ImportRowIssueSchema = void 0;
const zod_1 = require("zod");
/** 导入单行问题：行号从 2 开始算（第 1 行是表头） */
exports.ImportRowIssueSchema = zod_1.z.object({
    row: zod_1.z.number().int().positive(),
    reason: zod_1.z.string(),
});
/** 导入汇总：单行坏不影响整批，created 成功、skipped 可预期跳过、errors 需人工修 */
exports.ImportResultSchema = zod_1.z.object({
    created: zod_1.z.number().int().nonnegative(),
    skipped: zod_1.z.array(exports.ImportRowIssueSchema),
    errors: zod_1.z.array(exports.ImportRowIssueSchema),
});
