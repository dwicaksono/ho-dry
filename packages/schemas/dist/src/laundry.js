"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatusSchema = exports.LaundryItemSchema = exports.CreateLaundrySchema = void 0;
const zod_1 = require("zod");
// Zod schema used to validate create payload
exports.CreateLaundrySchema = zod_1.z.object({
    ward: zod_1.z.string().min(1),
    item_type: zod_1.z.string().min(1),
    quantity: zod_1.z.number().int().positive(),
    notes: zod_1.z.string().optional(),
});
exports.LaundryItemSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Item name is required"),
    quantity: zod_1.z.number().int().positive(),
    notes: zod_1.z.string().optional(),
});
exports.UpdateStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(["pending", "sorting", "washing", "drying", "ironing", "ready", "delivered"]),
});
