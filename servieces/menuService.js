const asyncHandler = require("express-async-handler");
const menuModel = require("../models/menuModel");

/*
function: createMenu
auth: Admin - manager
path: post: originalpath/menu
*/
exports.createMenu = asyncHandler(async (req, res) => {
  const menu = await menuModel.create(req.body);
  res.status(201).json({ data: menu });
});

/*
function: getMenus
auth: Admin - manager - user
path: get: originalpath/menu
*/
exports.getMenus = asyncHandler(async (req, res, next) => {
  const menu = await menuModel.find();
  res.status(200).json({ data: menu });
});

/*
function: getMenu
auth: Admin - manager - user
path: get: originalpath/menu/:id
*/
exports.getMenu = asyncHandler(async (req, res, next) => {
  const menu = await menuModel.findById(req.params.id);
  res.status(200).json({ data: menu });
});

/*
function: updateMenu
auth: Admin - manager
path: put: originalpath/menu/:id
*/
exports.updateMenu = asyncHandler(async (req, res, next) => {
  const menu = await menuModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ data: menu });
});

/*
function: deletemenu
auth: Admin - manager
path: delete: originalpath/menu/:id
*/
exports.deletemenu = asyncHandler(async (req, res, next) => {
  const menu = await menuModel.findByIdAndDelete(req.params.id);
  res.status(204).send()
});
