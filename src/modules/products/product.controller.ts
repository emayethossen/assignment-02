import { Request, Response } from "express";
import { ProductServices } from "./product.service";

// Create a Product
const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  const result = await ProductServices.createProduct(productData);
  res.json({
    success: true,
    message: "Product created successfully!",
    data: result,
  });
};

// Get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    let result;
    if (searchTerm && typeof searchTerm === "string") {
      result = await ProductServices.searchProducts(searchTerm);
    } else {
      result = await ProductServices.getAllProducts();
    }

    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : "Products fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch products",
      error: err,
    });
  }
};

// Get specific id
const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.getProductById(productId);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch products",
      error: err,
    });
  }
};

// Update a product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedProduct = await ProductServices.updateProduct(
      productId,
      req.body,
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found!" });
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not update product",
      error: err.message,
    });
  }
};

// Delete a product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await ProductServices.deleteProduct(productId);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found!" });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not delete product",
      error: err.message,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
