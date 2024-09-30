import ProductModel from "../model/product.model.js";
import uploadOnCloudinary from "../utils/cloudinary.util.js";

class ProductController {
  static async createProduct(req, res, next) {
    try {
      const file = req.file;
      const cloudinary = await uploadOnCloudinary(file.path);
      const newProduct = new ProductModel({
        productImage: cloudinary.secure_url,
        ...req.body,
      });
      await newProduct.save();

      res.status(201).json({
        message: "product created successfully",
      });
    } catch (error) {
      console.log("this is a error :", error);
      next(error);
    }
  }
  static async getAllProducts(req, res, next) {
    try {
      const products = await ProductModel.find();
      res.status(200).json(products);
    } catch (error) {
      console.log("This is an error:", error);
      next(error);
    }
  }
}
export default ProductController;
