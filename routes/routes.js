const express = require('express');
const router = express.Router();
const {indexHome, SorteiaCategoria} = require('../controllers/homeController');
const {indexCadastro, post} = require('../controllers/cadastroController');

router.get('/', SorteiaCategoria, indexHome);
router.get('/cadastro', indexCadastro)
router.post('/cadastro', post)


module.exports = router