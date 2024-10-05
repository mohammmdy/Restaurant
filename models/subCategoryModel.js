const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "subCategory name required"],
      unique: [true, "subCategory name must be unique"],
      minlength: [3, "Too short subCategory name"],
      maxlength: [32, "Too long subCategory name"],
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: [true, "subCategory must belong to category"],
    },
  },
  { timestamps: true }
);

const subCategoryModel = mongoose.model("subCategory", subCategorySchema);
module.exports = subCategoryModel;
