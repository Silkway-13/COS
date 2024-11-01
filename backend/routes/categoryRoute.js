const express = require("express");
const router = express.Router();

const getCategoryWorkOne = require("../controller/category/getCategoryWorkOne");
const getCategoryAllWork = require("../controller/category/getCategoryAllWork");

router.get("/get-categoryWork", getCategoryWorkOne);
router.post("/category-work", getCategoryAllWork);

module.exports = router;
