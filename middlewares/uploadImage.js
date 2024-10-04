const multer = require("multer");
const ApiError = require("../utils/apiError");

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
  uploadReturn().single(fieldName);
};
exports.uploadMultiImage = (fieldName, fieldsName) => {
  uploadReturn().fields([
    { name: fieldsName, maxCount: 5 },
    { name: fieldName, maxCount: 1 }
  ]);
};
