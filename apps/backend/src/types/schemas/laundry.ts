import { z } from "zod";

// Zod schema used to validate create payload
export const CreateLaundrySchema = z.object({
  ward: z.string().min(1),
  item_type: z.string().min(1),
  quantity: z.number().int().positive(),
  notes: z.string().optional(),
});

export const UpdateStatusSchema = z.object({
  status: z.enum(["pending", "sorting", "washing", "drying", "ironing", "ready", "delivered"]),
});

export const LaundryItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  quantity: z.number().int().positive(),
  notes: z.string().optional(),
});

export type CreateLaundryInput = z.infer<typeof CreateLaundrySchema>;
export type UpdateStatusInput = z.infer<typeof UpdateStatusSchema>;
export type LaundryItemInput = z.infer<typeof LaundryItemSchema>;