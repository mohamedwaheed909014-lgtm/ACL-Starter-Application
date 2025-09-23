const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: [true, "The name of the course is required"],
  },
  courseCode: {
    type: String,
    required: [true, "The code of the course is required"],
  },
  enrolledStudents: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
