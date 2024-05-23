import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
  variants: z.array(
    z.object({
      type: z.string().min(1, "Variant type is required"),
      value: z.string().min(1, "Variant value is required"),
    })
  ).optional(),
  inventory: z.object({
    quantity: z.number().nonnegative("Quantity must be a non-negative number"),
    inStock: z.boolean(),
  }),
});

export const productIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID");
