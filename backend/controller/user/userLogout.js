async function userLogoutController(req, res) {
  try {
    res.clearCookie("ger-token");

    res.status(200).json({
      message: "Logged out successfully",
      success: true,
      error: false,
      data: [],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userLogoutController;
