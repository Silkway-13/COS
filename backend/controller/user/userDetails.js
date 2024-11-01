const userModel = require("../../models/userModel");
const MyError = require("../../utils/MyError");

async function userDetailsController(req, res) {
  try {
    const userId = req.userId; // Extract userId from request

    if (!userId) {
      throw new MyError("User ID not provided", 400);
    }

    // Fetch user details from the database
    const userDetails = await userModel.findById(userId);

    if (!userDetails) {
      throw new MyError("User details not found", 404);
    }

    // Return user details
    res.status(200).json({
      message: "User details retrieved successfully",
      data: userDetails,
      error: false,
      success: true,
    });
  } catch (error) {
    // Handle errors
    const errorMessage = error.message || "Something went wrong";
    const errorCode = error.statusCode || 500; // Changed from `code` to `statusCode`
    res.status(errorCode).json({
      message: errorMessage,
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsController;
