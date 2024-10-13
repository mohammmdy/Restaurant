const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const ApiError = require("../utils/apiError");
const { jwtMaker } = require("../utils/jwt");
const bcrypt = require("bcryptjs");

exports.googleAuth = asyncHandler((req, res, next) => {
  const jwt = jwtMaker(req.user._id);
  res.status(200).json({ msg: req.user, jwt });
});

exports.signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await userModel.create({ name, email, password });
  res.status(201).json({ msg: user });
});

exports.signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  console.log(user);
  if (!user) return next(new ApiError(`no user exist`, 404));
  if (!await bcrypt.compare(password, user.password)) {
    return next(new ApiError(`this password not correct`, 401));
  }
  const jwt = jwtMaker(user._id);
  res.status(200).json({ msg: user, jwt });
});
