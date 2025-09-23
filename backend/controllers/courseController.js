const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");

// @desc    Create a new course
// @route   POST /api/courses
// @access  Public (you can modify this based on your authentication requirements)
const createCourse = asyncHandler(async (req, res) => {
  const { courseName, courseCode } = req.body;

  // Validate required fields
  if (!courseName || !courseCode) {
    res.status(400);
    throw new Error("Course name and course code are required");
  }

  // Check if course with the same code already exists
  const existingCourse = await Course.findOne({ courseCode });
  if (existingCourse) {
    res.status(400);
    throw new Error("Course with this code already exists");
  }

  // Create the course
  const course = await Course.create({
    courseName,
    courseCode,
    enrolledStudents: [], // Initialize with empty array
  });

  if (course) {
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: {
        _id: course._id,
        courseName: course.courseName,
        courseCode: course.courseCode,
        enrolledStudents: course.enrolledStudents,
      },
    });
  } else {
    res.status(400);
    throw new Error("Failed to create course");
  }
});

module.exports = {
  createCourse,
};
