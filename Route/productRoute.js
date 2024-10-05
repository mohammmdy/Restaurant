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

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(setsubCategoryIdToBody, createProduct)
  .get(setFilter, getProducts);
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
