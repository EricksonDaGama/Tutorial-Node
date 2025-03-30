const express = require('express');
const router = express.Router();

// Página principal — pode ser vazia
router.get('/', (req, res) => {
  res.send('API do Tour of Heroes está ativa!');
});

module.exports = router;
