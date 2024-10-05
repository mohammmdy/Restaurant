const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category name required"],
      unique: [true, "Category name must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
      lowercase: true,
    },
    description: {
      type: String,
      minlength: [5, "Too short product description"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      max: [200000, "Too long product price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: [true, "Product must be belong to category"],
    },
    subCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "subCategory",
      required: [true, "Product must be belong to subCategory"],
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    image: String,
  },
  { timestamps: true }
);

const proudctModel = mongoose.model("product", productSchema);
module.exports = proudctModel;
