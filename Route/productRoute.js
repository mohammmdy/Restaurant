const express = require("express");

const {
  setsubCategoryIdToBody,
  setFilter,
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../servieces/productService");

const {
  uploadSingleImage,
  resizeAndSaveImage,
} = require("../middlewares/uploadImage");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    uploadSingleImage("image"),
    resizeAndSaveImage("product", 500, 500, 90),
    setsubCategoryIdToBody,
    createProduct
  )
  .get(setFilter, getProducts);

router
  .route("/:id")
  .get(getProduct)
  .put(
    uploadSingleImage("image"),
    resizeAndSaveImage("product", 1000, 1000, 90),
    updateProduct
  )
  .delete(deleteProduct);

module.exports = router;
