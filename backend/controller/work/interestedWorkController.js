const interestedWorkModel = require("../../models/interestedWork");

const interestedWorkController = async (req, res) => {
  try {
    const { workId } = req.body;
    const currentUser = req.userId; // Assuming userId is directly available in the request object

    // Check if work with given workId already exists for the current user
    const existingWork = await interestedWorkModel.findOne({
      workId,
    });

    if (existingWork) {
      return res.json({
        message: "Сонирхож буй ажил хэсэгт аль хэдийн нэмэгдсэн байна.",
        success: false,
        error: true,
      });
    }

    // If work doesn't exist, create a new entry
    const payload = {
      workId: workId,
      quantity: 1,
      userId: currentUser,
    };

    const newWork = new interestedWorkModel(payload);
    const savedWork = await newWork.save();

    res.json({
      message: "Сонирхож буй ажил хэсэгт нэмэгдлээ.",
      success: true,
      data: savedWork,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = interestedWorkController;
