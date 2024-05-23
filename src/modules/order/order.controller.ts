import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import { orderSchema, orderQuerySchema } from "./order.validation";
import { z } from "zod";

// Create an order
const createOrder = async (req: Request, res: Response) => {
  try {
    orderSchema.parse(req.body);
    const orderData = req.body;
    const result = await OrderServices.createOrder(orderData);
    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: err.errors.map((e) => e.message).join(", "),
      });
    } else if (err instanceof OrderServices.AppError) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        // @ts-expect-error for skip type error
        error: err.message,
      });
    }
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
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: "Could not fetch orders",
      // @ts-expect-error for skip type error
      error: err.message,
    });
  }
};

// Get orders by email
const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    orderQuerySchema.parse(req.query);
    const { email } = req.query;

    const result = await OrderServices.getOrdersByEmail(email as string);
    res.status(200).json({
      success: true,
      message: `Orders fetched successfully for email: ${email}`,
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
        message: "Could not fetch orders",
        // @ts-expect-error for skip type error
        error: err.message,
      });
    }
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
};
