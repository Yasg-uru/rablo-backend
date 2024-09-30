import { Router } from "express";
import {
  authorization,
  isAuthenticated,
} from "../middleware/auth.middleware.js";
import ProductController from "../controller/product.controller.js";
import upload from "../middleware/multer.middleware.js";
const productRouter = Router();
productRouter.post(
  "/create",

  isAuthenticated,
  authorization("admin"),
  upload.single("file"),
  ProductController.createProduct
);
productRouter.get('/',ProductController.getAllProducts);

export default productRouter;
