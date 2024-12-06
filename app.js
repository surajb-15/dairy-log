const express = require("express");
const userRoute = require("./Route/userRoute");
const productRoute = require("./Route/productRoute");
const app = new express();

const globalErrorHandler = (err, req, res, next) => {
  let error = {};
  let errMsg = "Something went wrong";
  error.StatusCode = err.StatusCode != undefined ? error.StatusCode : 400;
  error.Status = err.errorStatus != undefined ? error.errorStatus : "Fail";
  error.Message = err.errorMsg != undefined ? error.errorMsg : errMsg;
  console.log(" 1 " + error);
  return res.status(error.StatusCode).json({
    status: error.Status,
    message: error.Message,
  });
};

app.use(express.json());
app.use("/v1/user", userRoute);
app.use("/v1/product", productRoute);
app.use(globalErrorHandler);

module.exports = app;
