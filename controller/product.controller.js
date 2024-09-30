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
  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      // Check if there is a new image
      if (req.file) {
        const file = req.file;
        const cloudinary = await uploadOnCloudinary(file.path);
        updatedData.productImage = cloudinary.secure_url; // Update image URL if a new image is uploaded
      }

      const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, {
        new: true, // Return the updated document
        runValidators: true, // Validate the updated data
      });

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.log("This is an error:", error);
      next(error);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const deletedProduct = await ProductModel.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(204).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.log("This is an error:", error);
      next(error);
    }
  }
}
export default ProductController;
