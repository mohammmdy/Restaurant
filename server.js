const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const connection = require("./config/dataBase");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const categoryRoute = require("./Route/categoryRoute");
const subCategoryRoute = require("./Route/subCategoryRoute");
const productRoute = require("./Route/productRoute");
const menuRoute = require("./Route/menuRoute");

dotenv.config({ path: "config.env" });
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'upload')))

connection();

app.use("/restaurant/category", categoryRoute);
app.use("/restaurant/subCategory", subCategoryRoute);
app.use("/restaurant/product", productRoute);
app.use("/restaurant/menu", menuRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`can't find this route ${req.originalUrl}`, 400));
});
app.use(globalError);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
