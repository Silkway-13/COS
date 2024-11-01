const userModel = require("../../models/userModel");
const MyError = require("../../utils/myError");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new MyError("Имэйл болон нууц үг шалгана уу?", 400);
    }

    // search the user
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      throw new MyError("Имэйл эсвэл нууц үг буруу байна", 401);
    }

    const itIsOk = await user.checkPassword(password);

    if (!itIsOk) {
      throw new MyError("Имэйл эсвэл нууц үг буруу байна", 401);
    }

    const token = user.getJsonWebToken();
    const cookieOption = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
    };
    res.status(200).cookie("ger-token", token, cookieOption).json({
      success: true,
      login: true,
      token,
      user: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
