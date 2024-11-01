const uploadWorkPermission = require("../../helpers/permission");
const taskModel = require("../../models/taskModel");
const MyError = require("../../utils/MyError");

async function UploadTaskController(req, res) {
  try {
    const uploadTask = new taskModel(req.body);
    const saveTask = await uploadTask.save();

    // Return user details
    res.status(201).json({
      message: "task upload successfully",
      error: false,
      success: true,
      data: saveTask,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadTaskController;
