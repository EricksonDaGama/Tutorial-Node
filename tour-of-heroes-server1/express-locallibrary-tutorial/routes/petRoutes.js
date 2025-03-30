const express = require("express");
const Pet = require("../models/pet");
const router = express.Router();

router.get("/", async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
});

router.get("/:id", async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  res.json(pet);
});

module.exports = router; 