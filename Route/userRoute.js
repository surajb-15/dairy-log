const express = require("express");
const userController = require("../Controller/userController");
const authController = require("../Controller/authController");
const route = express.Router();

route
  .route("/getAllUser")
  .get(authController.protect, userController.getAllUser);
route.route("/add").post(userController.addUser);
route
  .route("/:id")
  .delete(userController.deleteUser)
  .patch(userController.updateUser);
route.route("/login").post(userController.login);
module.exports = route;
