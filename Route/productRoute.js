const express = require("express");
const productController = require("../Controller/productController");
const route = express.Router();

route.route("/add").post(productController.addProduct);
route.route("/").get(productController.getAllProduct);

module.exports = route;
