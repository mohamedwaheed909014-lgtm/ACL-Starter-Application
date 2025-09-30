const mongoose = require("mongoose");
const User = require("./User/baseUserModel");

const vendorSchema = new mongoose.Schema({
  companyName: String,
});

const Vendor = User.discriminator("Vendor", vendorSchema);

module.exports = Vendor;
