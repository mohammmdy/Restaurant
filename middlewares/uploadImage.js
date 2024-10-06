const multer = require("multer");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const uploadReturn = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("only message allow", 400), false);
    }
  };

  const uploadImage = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

  return uploadImage;
};

exports.uploadSingleImage = (fieldName) => {
  return uploadReturn().single(fieldName);
};
exports.uploadMultiImage = (fieldName, fieldsName) => {
  return uploadReturn().fields([
    { name: fieldsName, maxCount: 5 },
    { name: fieldName, maxCount: 1 },
  ]);
};

exports.resizeAndSaveImage = (type, width=700, height=990, quality) => {
 return asyncHandler(async (req, res, next) => {
    if (req.file) {
      const image = `${type}-${uuidv4()}-${Date.now()}.jpeg`;
      await sharp(req.file.buffer)
        .resize(width, height)
        .toFormat("jpeg")
        .jpeg({ quality: quality })
        .toFile(`upload/${type}/${image}`);

      req.body.image = image;
    }
    next();
  });
};
