import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    subCategory:{type: String},
    image: { type: String, required: true },
    price: { type: Number, required: true },
    batchSize: { type: Number, required: true, default: 1 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    isPublic: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;