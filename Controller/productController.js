const Product = require("../Model/productModel");

exports.addProduct = async (req, res) => {
  try {
    let productData = await Product.create({
      name: req.body.name,
      status: req.body.status,
      price: req.body.price,
    });
    if (!productData) {
      res.status(500).json({
        status: "Fail",
        message: "Fail to add Product",
      });
    }
    res.status(201).json({
      status: "Success",
      message: "Product added successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: "Something went wrong",
      error: err,
    });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    // let pid = req.params;
    // let productData = await Product.findById(pid);
    let productData = await Product.find();
    res.status(200).json({
      status: "Success",
      message: "Products data fetched successfully",
      data: productData,
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      message: "Something went wrong",
      error: err,
    });
  }
};
