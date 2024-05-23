import { Order } from "./order.model";
import { TOrder } from "./order.interface";
import { Product } from "../products/product.model";

class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message);
  }
}

// Create an order
const createOrder = async (orderData: TOrder) => {
  // Check if the product exists
  const product = await Product.findById(orderData.productId);
  if (!product) {
    throw new Error("Product not found");
  }

  // Check if there is sufficient stock
  if (product.inventory.quantity < orderData.quantity) {
    throw new Error("Insufficient stock");
  }

  // Update the inventory
  product.inventory.quantity -= orderData.quantity;
  product.inventory.inStock = product.inventory.quantity > 0;

  // Save the updated product
  await product.save();

  // Create the order
  const result = await Order.create(orderData);
  return result;
};

// Get all orders
const getAllOrders = async () => {
  const result = await Order.find();
  return result;
};

// Get orders by email
const getOrdersByEmail = async (email: string) => {
  const result = await Order.find({ email });
  return result;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
  AppError,
};

export { AppError };
