const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const baseOptions = {
  discriminatorKey: "kind", // Our factory key
  collection: "users", // Store all user types in a single 'users' collection
};

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "please provide an email"],
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
      minlength: 5,
      // select: false,
    },
  },
  baseOptions
);

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
