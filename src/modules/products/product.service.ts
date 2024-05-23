import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// Create a product
const createProduct = async (payLoad: TProduct) => {
  const result = await Product.create(payLoad);
  return result;
};

// Get all product
const getAllProducts = async () => {
  const result = await Product.find();
  return result;
};

// Get product by ID
const getProductById = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

// Update a product
const updateProduct = async (id: string, payLoad: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payLoad, {
    new: true,
    runValidators: true,
  });
  return result;
};

// Delete a product
const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

// Search Product
const searchProducts = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, "i");
  const result = await Product.find({ name: { $regex: regex } });
  return result;
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
};
