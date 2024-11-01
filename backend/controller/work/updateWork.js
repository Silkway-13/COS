// const MyError = require("../../utils/myError");
const workModel = require("../../models/workModel");
const uploadWorkPermission = require("../../helpers/permission");

async function updateWorkController(req, res) {
  try {
    if (!uploadWorkPermission(req.userId)) {
      throw new MyError("Энэ үйлдлийг хийхэд таны эрх хүрэлцэхгүй байна", 403);
    }

    const { _id, ...resBody } = req.body;
    const updateWork = await workModel.findByIdAndUpdate(_id, resBody);

    res.json({
      message: "Work update successfully",
      success: true,
      data: updateWork,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = updateWorkController;
