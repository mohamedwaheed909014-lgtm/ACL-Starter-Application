const mongoose = require("mongoose");
const Worker = require("./workerModel");

const TASchema = new mongoose.Schema({});

const TA = Worker.discriminator("TA", TASchema);

module.exports = TA;
