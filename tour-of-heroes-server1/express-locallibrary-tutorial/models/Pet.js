const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model("pet", petSchema);