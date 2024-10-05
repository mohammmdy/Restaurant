const asyncHandler = require("express-async-handler");
const subCategoryModel = require("../models/subCategoryModel");

/*
function: createSubCategory
auth: Admin - manager
path: post: originalpath/subCategory
*/
exports.setCategoryIdToBody = asyncHandler((req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
});

exports.createSubCategory = asyncHandler(async (req, res) => {
  console.log(req.body);
  const subCategory = await subCategoryModel.create(req.body);
  res.status(201).json({ data: subCategory });
});

/*
function: getSubCategory
auth: admin - user - manager
path: get: originalpath/subCategory/:id
*/
exports.getSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await subCategoryModel.findById(req.params.id);
  res.status(200).json({ data: subCategory });
});

/*
function: getSubCategories
auth: Admin - manager - user
path: get: originalpath/subCategory/
*/
exports.setFilter = asyncHandler((req, res, next) => {
  filter = {};
  if (req.params.categoryId) filter = { category: req.params.categoryId };
  req.filterObj = filter;
  next();
});

exports.getSubCategories = asyncHandler(async (req, res, next) => {
  const subCategory = await subCategoryModel.find(req.filterObj);
  res.status(200).json({ data: subCategory });
});

/*
function: updateSubCategory
auth: Admin - manager
path: put: originalpath/subCategory/:id
*/
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const subCategory = await subCategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ data: subCategory });
});

/*
function: deleteSubCategory
auth: Admin - manager
path: delete: originalpath/subCategory/:id
*/
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const subCategory = await subCategoryModel.findByIdAndDelete(req.params.id);
  res.status(204).send();
});
