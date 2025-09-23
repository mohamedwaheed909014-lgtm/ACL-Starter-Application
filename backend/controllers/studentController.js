const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Student = require("../models/studentModel");

exports.getCoursesForStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res
      .status(400)
      .json({ message: "Invalid Student ID format for mongoDB" });
  }

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.log("Error when fetching courses for a student: ", error);
    res.status(500).json({ message: "Server error while fetching courses" });
  }
});
