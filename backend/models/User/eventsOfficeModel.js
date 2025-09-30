const mongoose = require("mongoose");
const User = require("./User/baseUserModel");

const eventsOfficeSchema = new mongoose.Schema({
  adminName: String,
});

const Events_Office = User.discriminator("Events_Office", eventsOfficeSchema);

module.exports = Events_Office;
