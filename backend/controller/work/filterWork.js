const workModel = require("../../models/workModel");

const filterWork = async (req, res) => {
  try {
    const categoryList = req?.body?.category || [];
    const work = await workModel.find({
      category: {
        $in: categoryList,
      },
    });

    res.status(200).json({
      message: "work",
      error: false,
      success: true,
      data: work,
    });
  } catch (error) {
    console.error("Error in getWorkDetailsController:", error);
    res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
};

module.exports = filterWork;
