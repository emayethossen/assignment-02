import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/products/product.route";
const app = express();

// parsers
app.use(express.json());

// application routes
app.use("/api/products", ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello EMAYET Hossen!");
});

export default app;
