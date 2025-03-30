const express = require("express");
const Hero = require("../models/hero");
const Pet = require("../models/pet");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Apagar todos os heróis e pets
    await Hero.deleteMany({});
    await Pet.deleteMany({});

    // Criar pets iniciais
    const pet1 = new Pet({ name: "Tigre" });
    const pet2 = new Pet({ name: "Falcão" });

    await pet1.save();
    await pet2.save();

    // Criar heróis iniciais
    const hero1 = new Hero({ name: "Capitão Fogo", petId: pet1._id });
    const hero2 = new Hero({ name: "Senhora Vento", petId: pet2._id });
    const hero3 = new Hero({ name: "Lobo Solitário" });

    await hero1.save();
    await hero2.save();
    await hero3.save();

    res.json({ message: "Base de dados inicializada com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
