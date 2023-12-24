import ProductModel from "../models/productModel.js";

export const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;
    const products = await ProductModel.find({}).limit(perPage).skip(skip);

    const numTotalProducts = await ProductModel.countDocuments();

    res.status(200).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(numTotalProducts / perPage),
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await ProductModel.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProductReview = async (req, res, next) => {
  try {
    const { productId } = req.params.productId;
    const product = await ProductModel.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const { content, rating } = req.body;
    if (!content || !rating) {
      res.status(400);
      throw new Error("Please provide all values.");
    }

    const createdReview = {
      writerId: req.user._id,
      writerName: req.user.name,
      content,
      rating: Number(rating),
    };

    product.reviews.push(createdReview);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => {
        return acc + review.rating;
      }, 0) / product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added successfully." });
  } catch (error) {
    next(error);
  }
};
