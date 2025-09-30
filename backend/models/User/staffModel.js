const mongoose = require("mongoose");
const Worker = require("./workerModel");

const staffSchema = new mongoose.Schema({});

const Staff = Worker.discriminator("Staff", staffSchema);

module.exports = Staff;
