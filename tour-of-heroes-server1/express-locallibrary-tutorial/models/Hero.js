const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  name: { type: String, required: true },
  petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" }
});

module.exports = mongoose.model("Hero", heroSchema);