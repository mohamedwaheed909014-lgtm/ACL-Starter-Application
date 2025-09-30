const mongoose = require("mongoose");
const Event = require("./baseEventModel");

const tripSchema = new mongoose.Schema({
  location: String,
  price: Number,
  capacity: Number,
});

const Trip = Event.discriminator("Trip", tripSchema);

module.exports = Trip;
