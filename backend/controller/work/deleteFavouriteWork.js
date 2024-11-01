const interestedWorkModel = require("../../models/interestedWork");

async function deleteFavouriteWork(req, res) {
  try {
    const currentUserId = req.userId;
    const deleteWorkId = req?.body?._id;

    // Use deleteOne method to delete the document
    const deletedWork = await interestedWorkModel.deleteOne({
      _id: deleteWorkId,
    });

    res.json({
      message: "Work deleted successfully",
      success: true,
      data: deletedWork,
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

module.exports = deleteFavouriteWork;
