const mongoose = require("mongoose");
const Event = require("./baseEventModel");

const workshopSchema = new mongoose.Schema({
  fullAgenda: String,
  responsibleFaculty: String,
  requiredBudget: Number,
  capacity: Number,
  extraRequiredResources: [String],
  fundingSource: { type: String, enum: ["external", "GUC"] },
  participationgProfessors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Professor",
    },
  ],
});

const Workshop = Event.discriminator("Workshop", workshopSchema);

module.exports = Workshop;
