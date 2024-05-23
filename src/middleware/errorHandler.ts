import { Request, Response } from "express";
import { AppError } from "../modules/order/order.service";

// Middleware to handle not found routes
const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

// Middleware to handle global errors
const errorHandler = (err: AppError, req: Request, res: Response) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

export { notFoundHandler, errorHandler };
