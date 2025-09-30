const mongoose = require("mongoose");
const Event = require("./baseEventModel");

const conferenceSchema = new mongoose.Schema({
  websiteLink: String,
  requiredBudget: Number,
  fundingSource: { type: String, enum: ["external", "GUC"] },
});

const Conference = Event.discriminator("Conference", conferenceSchema);

module.exports = Conference;
