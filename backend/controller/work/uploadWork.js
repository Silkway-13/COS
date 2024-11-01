const uploadWorkPermission = require("../../helpers/permission");
const workModel = require("../../models/workModel");
const MyError = require("../../utils/MyError");

async function UploadWorkController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadWorkPermission(sessionUserId)) {
      throw new MyError("Энэ үйлдлийг хийхэд таны эрх хүрэлцэхгүй байна", 403);
    }

    const uploadWork = new workModel(req.body);
    const saveWork = await uploadWork.save();

    // Return user details
    res.status(201).json({
      message: "work upload successfully",
      error: false,
      success: true,
      data: saveWork,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadWorkController;
