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

  // upload.single("file"),
  ProductController.createProduct
);
productRouter.delete(
  "/delete/:id",

  isAuthenticated,

  ProductController.deleteProduct
);
productRouter.put(
  "/update/:id",

  isAuthenticated,

  ProductController.updateProduct
);
productRouter.get("/", ProductController.getAllProducts);
productRouter.get("/featured", ProductController.featuredProducts);
productRouter.get("/price/:value", ProductController.productsLessThanValue);
productRouter.get(
  "/rating/:value",
  ProductController.productswithHiegherRating
);

export default productRouter;
