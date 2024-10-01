import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  productImage: {
    type: String,
    // required: [true, "Product Image is required"],
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
});

productSchema.path("rating").validate((value) => {
  return value >= 0 && value <= 5;
}, "Rating must be between 0 and 5.");

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
