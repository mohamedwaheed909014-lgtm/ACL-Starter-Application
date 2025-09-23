const express = require("express");
const authController = require("../controllers/authController");
const dataController = require("../controllers/dataController");

const router = express.Router();

router.get("/alldata", authController.verify, dataController.getData);

module.exports = router;
