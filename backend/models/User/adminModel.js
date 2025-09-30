const mongoose = require("mongoose");
const User = require("./User/baseUserModel");

const adminSchema = new mongoose.Schema({
  adminName: String,
});

const Admin = User.discriminator("Admin", adminSchema);

module.exports = Admin;
