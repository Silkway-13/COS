const express = require("express");
const authToken = require("../middleware/authToken");
const router = express.Router();

const UploadWorkController = require("../controller/work/uploadWork");
const getWorksController = require("../controller/work/getWorks");
const updateWorkController = require("../controller/work/updateWork");
const getWorkDetailsController = require("../controller/work/getWorkDetails");

const interestedWorkController = require("../controller/work/interestedWorkController");
const countWorkToInterested = require("../controller/user/countWorkToInterested");
const addToFavouriteViewWork = require("../controller/work/addToFavouriteViewWork");
const updateFavouriteWork = require("../controller/work/updateFavouriteWork");
const deleteFavouriteWork = require("../controller/work/deleteFavouriteWork");
const searchWork = require("../controller/work/searchWork");
const filterWork = require("../controller/work/filterWork");
const OrderRequest = require("../controller/work/orderRequest");
const allOrdersController = require("../controller/work/allOrders");
const allTasksController = require("../controller/work/allTasks");
const UploadTaskController = require("../controller/work/uploadTask");
// order request
router.post("/order-request", authToken, OrderRequest);
router.get("/all-orders", authToken, allOrdersController);
// task getss
router.get("/all-tasks", authToken, allTasksController);
//  task uplaod
router.post("/upload-task", authToken, UploadTaskController);
// work
router.post("/upload-work", authToken, UploadWorkController);
router.get("/get-works", getWorksController);
router.post("/update-work", authToken, updateWorkController);
router.post("/work-details", getWorkDetailsController);
router.get("/searchWork", searchWork);
router.post("/filter-work", filterWork);

// user add to cart
router.post("/addToInterested", authToken, interestedWorkController);
router.get("/countInterestedWork", authToken, countWorkToInterested);
router.get("/interested-view-work", authToken, addToFavouriteViewWork);
router.post("/update-interested-work", authToken, updateFavouriteWork);
router.post("/delete-interested-work", authToken, deleteFavouriteWork);

module.exports = router;
