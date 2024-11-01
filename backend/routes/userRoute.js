const express = require("express");
const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const userLogoutController = require("../controller/user/userLogout");
const authToken = require("../middleware/authToken");
const allUsersController = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/user-logout", userLogoutController);

// admin panel
router.get("/all-user", authToken, allUsersController);
router.post("/update-user", authToken, updateUser);

module.exports = router;
