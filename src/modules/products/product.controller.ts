import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { productSchema, productIdSchema } from "./product.validation";
import { z } from "zod";

// Create a Product
const createProduct = async (req: Request, res: Response) => {
  try {
    productSchema.parse(req.body);
    const productData = req.body;
    const result = await ProductServices.createProduct(productData);
    res.json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: err.errors.map((e) => e.message).join(", "),
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
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
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: "Could not fetch products",
      error: err,
    });
  }
};

// Get specific product by ID
const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    productIdSchema.parse(productId);

    const result = await ProductServices.getProductById(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: err.errors.map((e) => e.message).join(", "),
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Could not fetch product",
        // @ts-expect-error for skip type error
        error: err.message,
      });
    }
  }
};

// Update a product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    productIdSchema.parse(productId);
    productSchema.partial().parse(req.body);

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
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: err.errors.map((e) => e.message).join(", "),
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Could not update product",
        // @ts-expect-error for skip type error
        error: err.message,
      });
    }
  }
};

// Delete a product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    productIdSchema.parse(productId);

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
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: err.errors.map((e) => e.message).join(", "),
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Could not delete product",
        // @ts-expect-error for skip type error
        error: err.message,
      });
    }
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
