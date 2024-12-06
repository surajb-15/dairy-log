const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, require: [true, "Please provide product name"] },
  status: {
    type: String,
    enum: ["active", "inActive", "deleted"],
    default: "active",
  },
  price: { type: Number },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
