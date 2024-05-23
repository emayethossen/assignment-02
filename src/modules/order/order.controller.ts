import { Request, Response } from "express";
import { OrderServices } from "./order.service";

// Create a New Order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await OrderServices.createOrder(orderData);
    res.json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: err.message,
    });
  }
};

// Get all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrders();

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch orders",
      error: err.message,
    });
  }
};

// Get orders by user email
const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email parameter is required" });
    }

    const orders = await OrderServices.getOrdersByEmail(email.toString());
    res.status(200).json({
      success: true,
      message: `Orders fetched successfully for user email '${email}'!`,
      data: orders,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch orders",
      error: err.message,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
};
