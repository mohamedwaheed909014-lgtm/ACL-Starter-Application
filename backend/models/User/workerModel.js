const mongoose = require("mongoose");
const User = require("./baseUserModel");

const baseOptions = {
  discriminatorKey: "workerType",
};

const workerSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    staffId: String,
  },
  baseOptions
);

const Worker = User.discriminator("Worker", workerSchema);

module.exports = Worker;
