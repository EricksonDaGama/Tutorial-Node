
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Hero = require("./models/hero");
const Pet = require("./models/pet");



const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json()); // Para processar JSON no corpo da requisição

// Conectar ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado ao MongoDB Atlas"))
.catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

// Rotas de teste
app.get("/", (req, res) => {
  res.send("🚀 Servidor está a funcionar!");
});

// Rotas
const heroRoutes = require("./routes/heroRoutes");
app.use("/heroes", heroRoutes);
app.use("/hero", heroRoutes);


const petRoutes = require("./routes/petRoutes.js");
app.use("/pets", petRoutes);

app.get("/init", async (req, res) => {
  try {
      //Apagar coleções
      await Hero.deleteMany({});
      await Pet.deleteMany({});

      // Inserir dados iniciais
      const hero1 = await Hero.create({ name: "Superman" });
      const hero2 = await Hero.create({ name: "Batman"});

      const pet1 = await Pet.create({ name: "Paco" });
      const pet2 = await Pet.create({ name: "Rex" });


      res.json({ message: "Base de dados inicializada!", heroes: [hero1, hero2], pets: [pet1, pet2] });
  } catch (error) {
      res.status(500).json({ error: "Erro ao inicializar a base de dados", details: error.message });
      
  }
});
app.post("/hero", async (req, res) => {
  try {
    const { name, petId } = req.body;

    // Verificar se o nome foi enviado
    if (!name) {
        return res.status(400).json({ error: "O nome do herói é obrigatório." });
    }

    // Criar um novo herói na base de dados
    const newHero = new Hero({ name, petId: petId || null });
    await newHero.save();

    res.status(201).json({ message: "Herói criado com sucesso!", hero: newHero });
  } catch (error) {
      res.status(400).json({ error: "Erro ao criar o herói", details: error.message });
  }
});

app.post("/pet", async (req, res) => {
    try {
      const { name } = req.body;
  
      // Verificar se o nome foi enviado
      if (!name) {
          return res.status(400).json({ error: "O nome do pet é obrigatório." });
      }
  
      // Criar um novo herói na base de dados
      const newPet = new Pet ({ name });
      await newPet.save();
  
      res.status(201).json({ message: "Pet criado com sucesso!", Pet: newPet });
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar o pet", details: error.message });
    }
  });
  


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor a correr em http://localhost:${PORT}`);
});