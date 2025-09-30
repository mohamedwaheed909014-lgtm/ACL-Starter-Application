const mongoose = require("mongoose");
const User = require("./User/BaseUserModel");

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  studentId: String,
});

const Student = User.discriminator("Student", studentSchema);

module.exports = Student;
