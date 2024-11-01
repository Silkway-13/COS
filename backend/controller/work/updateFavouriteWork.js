const interestedWorkModel = require("../../models/interestedWork");

async function updateFavouriteWork(req, res) {
  try {
    const currentUserId = req.userId;
    const addToFavouriteWorkId = req?.body?._id;

    const qty = req.body.quantity;

    // Corrected usage of updateOne method
    const updateWork = await interestedWorkModel.updateOne(
      { _id: addToFavouriteWorkId }, // Filter object to identify the document to update
      { $set: { quantity: qty } } // Update object to set the quantity field
    );

    res.json({
      message: "Work updated successfully",
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

module.exports = updateFavouriteWork;
