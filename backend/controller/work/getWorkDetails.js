const workModel = require("../../models/workModel");

async function getWorkDetailsController(req, res) {
  try {
    const { workId } = req.body;

    // Validate workId
    if (!workId) {
      return res.status(400).json({
        message: "workId is required",
        error: true,
        success: false,
      });
    }

    // Find work by Id
    const work = await workModel.findById(workId);

    // Check if work exists
    if (!work) {
      return res.status(404).json({
        message: "Work not found",
        error: true,
        success: false,
      });
    }

    // Return work data
    res.status(200).json({
      message: "Work retrieved successfully",
      error: false,
      success: true,
      data: work,
    });
  } catch (error) {
    // Handle errors
    console.error("Error in getWorkDetailsController:", error);
    res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

module.exports = getWorkDetailsController;
