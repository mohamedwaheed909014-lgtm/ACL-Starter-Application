const mongoose = require("mongoose");
const Event = require("./baseEventModel");

const bazaarSchema = new mongoose.Schema({
  location: String,
});

const Bazaar = Event.discriminator("Bazaar", bazaarSchema);

module.exports = Bazaar;
