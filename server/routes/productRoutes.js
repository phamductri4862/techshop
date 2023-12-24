import express from "express";
import {
  createProductReview,
  getProductById,
  getProducts,
} from "../controllers/productController.js";
import { verifyUser } from "../middlewares/verifyAuth.js";
const productRoutes = express.Router();

productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProductById);
productRoutes.post("/:id/reviews", verifyUser, createProductReview);

export default productRoutes;
