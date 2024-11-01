const interestedWorkModel = require("../../models/interestedWork");

const addToFavouriteViewWork = async (req, res) => {
  try {
    const currentUser = req.userId;
    const allWork = await interestedWorkModel
      .find({
        userId: currentUser,
      })
      .populate("workId");
    // Return work data
    res.status(200).json({
      error: false,
      success: true,
      data: allWork,
    });
  } catch (error) {
    // Handle errors
    console.error("Error in addToFavouriteViewWork:", error.message);
    res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};

module.exports = addToFavouriteViewWork;
