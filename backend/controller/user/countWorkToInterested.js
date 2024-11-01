const interestedWork = require("../../models/interestedWork");

async function countWorkToInterested(req, res) {
  try {
    const userId = req.userId;
    const count = await interestedWork.countDocuments({
      userId: userId,
    });
    res.json({
      data: {
        count,
      },
      message: "count ok",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = countWorkToInterested;
