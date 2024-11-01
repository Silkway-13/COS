const userModel = require("../../models/userModel");

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    const user = await userModel.findOne({ email });

    console.log("user ", user);
    if (user) {
      throw new Error("Та аль хэдийн бүртгүүлсэн байна.");
    }

    if (!email) {
      throw new Error("Please provide an email");
    }
    if (!password) {
      throw new Error("Please provide a password");
    }
    if (!name) {
      throw new Error("Please provide a name");
    }

    // ----------------
    const userData = new userModel(req.body);
    const saveUser = await userData.save();

    const token = saveUser.getJsonWebToken();

    res.status(200).json({
      data: saveUser,
      success: true,
      token: token,
      error: false,
      message: "User signed up successfully.",
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      succes: false,
    });
  }
}

module.exports = userSignUpController;
