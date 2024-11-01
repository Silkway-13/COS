const workModel = require("../../models/workModel");

const getCategoryWorkOne = async (req, res) => {
  try {
    const workCategory = await workModel.distinct("category");

    console.log("workCategory=> ", workCategory);
    // array to store one product from each category
    const workByCategory = [];

    for (const category of workCategory) {
      const work = await workModel.findOne({ category: category });

      if (work) {
        workByCategory.push(work);
      }
    }

    res.status(200).json({
      message: "Category Work",
      success: true,
      error: false,
      data: workByCategory,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryWorkOne;
