const express = require("express");

const {
  setCategoryIdToBody,
  setFilter,
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../servieces/subCategoryService");

const productRoute = require("./productRoute");

const router = express.Router({ mergeParams: true });

router.use("/:subCategoryId/products", productRoute);

router
  .route("/")
  .post(setCategoryIdToBody, createSubCategory)
  .get(setFilter, getSubCategories);
router
  .route("/:id")
  .get(getSubCategory)
  .put(updateSubCategory)
  .delete(deleteSubCategory);

module.exports = router;
