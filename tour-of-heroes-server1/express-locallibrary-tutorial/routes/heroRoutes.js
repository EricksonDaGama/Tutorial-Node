const express = require("express");
const Hero = require("../models/hero");
const router = express.Router();

// Buscar todos os heróis
router.get("/", async (req, res) => {
  const heroes = await Hero.find();
  res.json(heroes);
});

// Buscar um herói pelo ID
router.get("/:id", async (req, res) => {
  const hero = await Hero.findById(req.params.id);
  res.json(hero);
}); 

// Criar um herói
router.post("/", async (req, res) => {
  const newHero = new Hero(req.body);
  await newHero.save();
  res.json(newHero);
});

// Apagar um herói
router.delete("/:id", async (req, res) => {
  await Hero.findByIdAndDelete(req.params.id);
  res.json({ message: "Herói apagado!" });
});

module.exports = router;