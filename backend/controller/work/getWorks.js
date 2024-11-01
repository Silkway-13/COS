const workModel = require("../../models/workModel");

async function getWorksController(req, res) {
  try {
    // Fetch all works and sort by createdAt in descending order
    const allWorks = await workModel.find().sort({ createdAt: -1 });

    // Return works data
    res.status(200).json({
      message: "All Works",
      error: false,
      success: true,
      data: allWorks,
    });
  } catch (error) {
    // Handle errors
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = getWorksController;
