const express = require("express");
const studentController = require("../controllers/studentController");

const router = express.Router();

router.post("/new");
router.get("/:studentId/courses", studentController.getCoursesForStudent);
