const express = require('express');
const router = express.Router();
const {indexHome, SorteiaCategoria} = require('../controllers/homeController');
const {indexCadastro, post} = require('../controllers/cadastroController');
const {indexCategorias} = require('../controllers/categoriasController');

router.get('/', SorteiaCategoria, indexHome);
router.get('/cadastro', indexCadastro)
router.post('/cadastro', post)
router.get('/categorias', indexCategorias)


module.exports = router