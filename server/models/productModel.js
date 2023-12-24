import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    writerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    writerName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    numReviews: {
      type: String,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
