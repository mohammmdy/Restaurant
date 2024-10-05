const asyncHandler = require("express-async-handler");
const productModel = require("../models/productModel");

/*
function: createProduct
auth: Admin - manager
path: post: originalpath/product
*/
exports.setsubCategoryIdToBody = asyncHandler((req, res, next) => {
  if (!req.body.subCategory) req.body.subCategory = req.params.subCategoryId;
  next();
});

exports.createProduct = asyncHandler(async (req, res) => {
  console.log(req.body);
  const product = await productModel.create(req.body);
  res.status(201).json({ data: product });
});

/*
function: getProduct
auth: admin - user - manager
path: get: originalpath/product/:id
*/
exports.getProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.status(200).json({ data: product });
});

/*
function: getproducts
auth: Admin - manager - user
path: get: originalpath/product/
*/
exports.setFilter = asyncHandler((req, res, next) => {
  filter = {};
  if (req.params.subCategoryId)
    filter = { subCategory: req.params.subCategoryId };
  req.filterObj = filter;
  next();
});

exports.getProducts = asyncHandler(async (req, res, next) => {
  const product = await productModel.find(req.filterObj);
  res.status(200).json({ data: product });
});

/*
function: updateProduct
auth: Admin - manager
path: put: originalpath/product/:id
*/
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const product = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ data: product });
});

/*
function: deleteProduct
auth: Admin - manager
path: delete: originalpath/product/:id
*/
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await productModel.findByIdAndDelete(req.params.id);
  res.status(204).send();
});
