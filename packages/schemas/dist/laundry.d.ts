import { z } from "zod";
export declare const CreateLaundrySchema: z.ZodObject<{
    ward: z.ZodString;
    item_type: z.ZodString;
    quantity: z.ZodNumber;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const LaundryItemSchema: z.ZodObject<{
    name: z.ZodString;
    quantity: z.ZodNumber;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const UpdateStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        pending: "pending";
        sorting: "sorting";
        washing: "washing";
        drying: "drying";
        ironing: "ironing";
        ready: "ready";
        delivered: "delivered";
    }>;
}, z.core.$strip>;
export type CreateLaundryInput = z.infer<typeof CreateLaundrySchema>;
export type UpdateStatusInput = z.infer<typeof UpdateStatusSchema>;
export type LaundryItemInput = z.infer<typeof LaundryItemSchema>;
//# sourceMappingURL=laundry.d.ts.map