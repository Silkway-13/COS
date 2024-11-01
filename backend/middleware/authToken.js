const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    let token = null;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies) {
      token = req.cookies["ger-token"];
    }

    if (!token) {
      throw new MyError("Та эхлээд нэвтэрч орно уу?", 401);
    }

    const tokenObject = jwt.verify(token, process.env.JWT_SECRET);

    // req.user = await User.findById(tokenObject.id);
    req.userId = tokenObject.id;
    req.userRole = tokenObject.role;
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
