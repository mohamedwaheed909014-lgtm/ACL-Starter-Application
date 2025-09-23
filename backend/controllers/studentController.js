const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Student = require("../models/studentModel");

exports.createStudent = asyncHandler(async (req, res) => {
  const { firstName, lastName } = req.body;

  // Validate required fields
  if (!firstName || !lastName) {
    return res.status(400).json({
      message: "First name and last name are required",
    });
  }

  try {
    // Create the student
    const student = await Student.create({
      firstName,
      lastName,
      enrolledCourses: [], // Initialize with empty array
    });

    if (student) {
      return res.status(201).json({
        message: "Student created successfully",
        student: {
          _id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          enrolledCourses: student.enrolledCourses,
        },
      });
    } else {
      return res.status(400).json({ message: "Failed to create student" });
    }
  } catch (error) {
    console.log("Error when creating student: ", error);
    res.status(500).json({ message: "Server error while creating student" });
  }
});

exports.addCourseToStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const { courseId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res
      .status(400)
      .json({ message: "Invalid Student ID format for mongoDB" });
  }

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res
      .status(400)
      .json({ message: "Invalid Course ID format for mongoDB" });
  }

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if the course is already enrolled
    if (student.enrolledCourses.includes(courseId)) {
      return res
        .status(400)
        .json({ message: "Course is already enrolled by the student" });
    }

    // Add the course to the student's enrolledCourses array
    student.enrolledCourses.push(courseId);
    await student.save();

    return res
      .status(200)
      .json({ message: "Course added to student successfully", student });
  } catch (error) {
    console.log("Error when adding course to student: ", error);
    res.status(500).json({ message: "Server error while adding course" });
  }
});

exports.getCoursesForStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res
      .status(400)
      .json({ message: "Invalid Student ID format for mongoDB" });
  }

  try {
    const student = await Student.findById(studentId).populate(
      "enrolledCourses"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    } else {
      return res.status(200).json({ student });
    }
  } catch (error) {
    console.log("Error when fetching courses for a student: ", error);
    res.status(500).json({ message: "Server error while fetching courses" });
  }
});
