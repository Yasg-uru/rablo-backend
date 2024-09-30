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
}
export default ProductController;
