const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userModel = new mongoose.Schema({
  name: { type: String, required: [true, "Please enter name"] },
  surname: { type: String, required: [true, "Please enter surname"] },
  email: { type: String, required: [true, "Please enter email"], unique: true },
  password: { type: String, required: [true, "Please enter Password"] },
  address1: { type: String, required: [true, "Please enter address"] },
  address2: { type: String },
  landmark: { type: String, required: [true, "Please enter landmark"] },
  Taluka: { type: String, required: [true, "Please enter Taluka name"] },
  district: { type: String, required: [true, "Please enter district name"] },
  pincode: { type: Number, required: [true, "Please enter pincode"] },
});
userModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
const User = mongoose.model("User", userModel);

module.exports = User;
