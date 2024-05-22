import { Schema, model } from "mongoose";
import { TProduct, TVarients } from "./product.interface";

const variantsSchema = new Schema<TVarients>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  variants: {
    type: [variantsSchema],
    default: [],
  },
  inventory: {
    type: {
      quantity: {
        type: Number,
        required: true,
      },
      inStock: {
        type: Boolean,
        required: true,
      },
    },
    required: true,
  },
});

export const Product = model<TProduct>("Product", productSchema);
