const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    image: String,
  },
  { timestamps: true }
);

const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/menu/${doc.image}`;
    doc.image = imageUrl;
  }
};

menuSchema.post("init", (doc) => {
  setImageUrl(doc);
});
menuSchema.post("save", (doc) => {
  setImageUrl(doc);
});

const menuModel = mongoose.model("menu", menuSchema);
module.exports = menuModel;
