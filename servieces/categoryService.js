const asyncHandler = require("express-async-handler");
const categoryModel = require("../models/categoryModel");

/*
function: createCategory
auth: Admin - manager
path: post: originalpath/category
*/
exports.createCategory = asyncHandler(async (req, res) => {
  const category = await categoryModel.create(req.body);
  res.status(201).json({ data: category });
});

/*
function: getCategory
auth: admin - user - manager
path: get: originalpath/category/:id
*/
exports.getCategory = asyncHandler(async (req, res) => {
  const category = await categoryModel.findById(req.params.id);
  res.status(200).json({ data: category });
});

/*
function: getCategories
auth: Admin - manager - user
path: get: originalpath/category/
*/
exports.getCategories = asyncHandler(async (req, res, next) => {
  const category = await categoryModel.find();
  res.status(200).json({ data: category });
});

/*
function: updateCategory
auth: Admin - manager
path: put: originalpath/category/:id
*/
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await categoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ data: category });
});

/*
function: deleteCategory
auth: Admin - manager
path: delete: originalpath/category/:id
*/
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await categoryModel.findByIdAndDelete(req.params.id);
  res.status(204).send()
});
