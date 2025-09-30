const mongoose = require("mongoose");

const baseOptions = {
  discriminatorKey: "kind",
  collections: "events",
};

const eventSchema = new mongoose.Schema(
  {
    eventName: String,
    startDate: Date,
    endDate: Date,
    description: String,
    registerationDeadline: Date,
  },
  baseOptions
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
