import { z } from "zod";

export const orderSchema = z.object({
  email: z.string().email("Invalid email format"),
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID"),
  price: z.number().positive("Price must be a positive number"),
  quantity: z.number().positive("Quantity must be a positive number"),
});

export const orderQuerySchema = z.object({
  email: z.string().email("Invalid email format"),
});
