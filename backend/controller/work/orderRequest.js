// const uploadWorkPermission = require("../../helpers/permission");
const orderModel = require("../../models/orderModel");
// const workModel = require("../../models/workModel");
const MyError = require("../../utils/MyError");

async function OrderRequest(req, res) {
  try {
    // const uploadWork = new workModel(req.body);
    const orderRequest = new orderModel(req.body);
    // const saveWork = await uploadWork.save();
    const saveRequest = await orderRequest.save();

    // Return user details
    res.status(201).json({
      message: "захиалгын хүсэлт хадгалагдлаа",
      error: false,
      success: true,
      data: saveRequest,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = OrderRequest;
