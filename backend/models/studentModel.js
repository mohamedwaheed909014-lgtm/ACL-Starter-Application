const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "The name of the student is required"],
  },
  lastName: {
    type: String,
    required: [true, "The name of the student is required"],
  },
  enrolledCourses: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
