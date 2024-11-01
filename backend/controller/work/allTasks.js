const taskModel = require("../../models/taskModel");

async function allTasksController(req, res) {
  try {
    // Retrieve all orders from the database
    const allTask = await taskModel.find();

    // Respond with the retrieved orders
    res.status(200).json({
      message: "All orders retrieved successfully",
      data: allTask,
      success: true,
      error: false,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error retrieving all orders:", error);

    // Respond with an error message
    res.status(500).json({
      message: "Failed to retrieve orders",
      error: true,
      success: false,
      details: error.message || error,
    });
  }
}

module.exports = allTasksController;
