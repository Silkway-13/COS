const workModel = require("../../models/workModel");

async function searchWork(req, res) {
  try {
    const query = req.query.q;
    console.log(query);
    const regex = new RegExp(query, "i"); // Use "i" for case-insensitive matching
    const work = await workModel.find({
      $or: [
        {
          workName: { $regex: regex }, // Use $regex for regex matching in MongoDB
        },
        {
          category: { $regex: regex },
        },
      ],
    });

    res.status(200).json({
      data: work,
      message: "Search work list",
      error: false,
      success: true,
    });
  } catch (error) {
    // Handle errors and send error response
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = searchWork;
