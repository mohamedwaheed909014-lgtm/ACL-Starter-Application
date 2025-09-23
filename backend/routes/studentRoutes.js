const express = require("express");
const studentController = require("../controllers/studentController");

const router = express.Router();

router.post("/new", studentController.createStudent);
router.post("/:studentId/courses", studentController.addCourseToStudent);
router.get("/:studentId/courses", studentController.getCoursesForStudent);

module.exports = router;
