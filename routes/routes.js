const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const cadastroController = require('../controllers/cadastroController');

router.get('/', homeController.index);
router.get('/cadastro', cadastroController.teste)


module.exports = router