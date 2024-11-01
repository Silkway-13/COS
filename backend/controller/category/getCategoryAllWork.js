const workModel = require("../../models/workModel");

const getCategoryAllWork = async (req, res) => {
  try {
    let category;

    if (req.query && req.query.category) {
      category = req.query.category;
    } else if (req.body && req.body.category) {
      category = req.body.category;
    } else {
      return res.status(400).json({
        message: "Category not provided",
        error: true,
        success: false,
      });
    }

    const works = await workModel.find({ category });

    res.status(200).json({
      data: works,
      message: "Works fetched successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryAllWork;
