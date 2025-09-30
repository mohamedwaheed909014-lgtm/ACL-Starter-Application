const mongoose = require("mongoose");
const Worker = require("./workerModel");

const professorSchema = new mongoose.Schema({
  workshops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workshop",
    },
  ],
});

const Professor = Worker.discriminator("Professor", professorSchema);

module.exports = Professor;
