const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "please provide an email"],
  },
  password: {
    type: String,
    required: [
      function () {
        return !this.googleId;
      },
      "please provide a password",
    ],
    minlength: 5,
    // select: false,
  },
  passwordConfirm: {
    type: String,
    required: [
      function () {
        return !this.googleId;
      },
      "please confirm your password",
    ],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not the same",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
  }
  next();
});

// userSchema.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
