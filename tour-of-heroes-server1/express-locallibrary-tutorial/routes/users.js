const express = require('express');
const router = express.Router();

// Apenas um exemplo de rota
router.get('/', function (req, res) {
  res.send('Rota de usuários (placeholder)');
});

module.exports = router;
