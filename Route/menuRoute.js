const express = require("express");

const {
  createMenu,
  getMenus,
  getMenu,
  updateMenu,
  deletemenu,
} = require("../servieces/menuService");

const {
  uploadSingleImage,
  resizeAndSaveImage,
} = require("../middlewares/uploadImage");

const router = express.Router();

router
  .route("/")
  .post(
    uploadSingleImage("image"),
    resizeAndSaveImage("menu", undefined, undefined, 90),
    createMenu
  )
  .get(getMenus);
router
  .route("/:id")
  .get(getMenu)
  .put(
    uploadSingleImage("image"),
    resizeAndSaveImage("menu", undefined, undefined, 90),
    updateMenu
  )
  .delete(deletemenu);

module.exports = router;
