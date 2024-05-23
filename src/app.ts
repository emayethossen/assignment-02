import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/products/product.route";
import { OrderRoutes } from "./modules/order/order.route";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler";

const app = express();

// parsers
app.use(express.json());

// application routes
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello EMAYET Hossen!");
});

export default app;
