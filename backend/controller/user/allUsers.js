const userModel = require("../../models/userModel");
const MyError = require("../../utils/MyError");

async function allUsersController(req, res) {
  try {
    console.log("userid all users => ", req.userId);
    const allUsers = await userModel.find();
    res.json({
      message: "All users",
      data: allUsers,
      success: true,
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

module.exports = allUsersController;
