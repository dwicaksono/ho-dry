// src/laundry.ts
import { z } from "zod";
var CreateLaundrySchema = z.object({
  ward: z.string().min(1),
  item_type: z.string().min(1),
  quantity: z.number().int().positive(),
  notes: z.string().optional()
});
var UpdateStatusSchema = z.object({
  status: z.enum(["pending", "sorting", "washing", "drying", "ironing", "ready", "delivered"])
});
export {
  CreateLaundrySchema,
  UpdateStatusSchema
};
