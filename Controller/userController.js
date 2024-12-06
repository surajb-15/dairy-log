const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../Model/userModel");
const User = require("../Model/userModel");

exports.getAllUser = async (req, res) => {
  const users = await userModel.find();
  res.status(200).json({
    status: "Success",
    message: "Data fetched successfully",
    Data: users,
  });
};

exports.addUser = async (req, res) => {
  try {
    const user = await userModel.create({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password,
      address1: req.body.address1,
      address2: req.body.address2,
      landmark: req.body.landmark,
      Taluka: req.body.Taluka,
      district: req.body.district,
      pincode: req.body.pincode,
    });
    const token = await jwt.sign({ id: user._id }, process.env.SECRETE_KEY, {
      expiresIn: "1d",
    });
    res.status(201).json({
      status: "Success",
      message: "User added successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({
        status: "Fail",
        message: "Fail to add User",
        errors: errors,
      });
    }
    res.status(500).json({
      status: "Fail",
      message: "Something went wrong",
      errors: "",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    //findByIdAndDelete return deleted document if not found throw error
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Success",
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "Please enter valid userId",
      errors: "",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const UserData = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "Success",
      message: "User updated sucessfully",
      Data: UserData,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "invalid User",
    });
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      status: "Fail",
      message: "Please Provide email or password",
    });
  }
  const userData = await User.findOne({ email });
  let passData = await bcrypt.compare(password, userData.password);
  if (!userData || !passData) {
    //always return res object for any error/success if no further code needs to be exucute
    return res.status(400).json({
      status: "Fail",
      message: "Incorrect user or password",
    });
  }
  const token = await jwt.sign({ id: userData._id }, process.env.SECRETE_KEY, {
    expiresIn: "1d",
  });
  res.status(200).json({
    status: "Success",
    message: "Login Successfully",
    token: token,
  });
};
