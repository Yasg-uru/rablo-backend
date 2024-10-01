import ProductModel from "../model/product.model.js";
import uploadOnCloudinary from "../utils/cloudinary.util.js";

class ProductController {
  static async createProduct(req, res, next) {
    try {
      const { productId, name, price, featured, rating, company } = req.body;
      const newProduct = new ProductModel({
        
        productId, name, price, featured, rating, company
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
      res.status(200).json({ products });
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

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        updatedData,
        {
          new: true,
          runValidators: true,
        }
      );

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
  static async featuredProducts(req, res, next) {
    try {
      const featuredProducts = await ProductModel.find({ featured: true });
      res.status(200).json({
        message: "Fetched featured products",
        featuredProducts,
      });
    } catch (error) {
      next(error);
    }
  }
  static async productsLessThanValue(req, res, next) {
    try {
      const { value } = req.params;
      console.log("this is value:", value);
      const products = await ProductModel.find({ price: { $lt: value } });
      res.status(200).json({
        message: "fetched products less than certain value",
        products,
      });
    } catch (error) {
      next(error);
    }
  }
  static async productswithHiegherRating(req, res, next) {
    try {
      const { value } = req.params;
      const products = await ProductModel.find({ rating: { $gt: value } });
      res.status(200).json({
        message: "fetched products greater than certain value",
        products,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default ProductController;
