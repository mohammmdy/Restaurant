const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category name required"],
      unique: [true, "Category name must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
      lowercase: true,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;
