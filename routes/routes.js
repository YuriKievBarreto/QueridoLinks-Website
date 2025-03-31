const express = require('express');
const router = express.Router();
const {indexHome} = require('../controllers/homeController');
const {indexCadastro, post} = require('../controllers/cadastroController');
const {indexCategorias} = require('../controllers/categoriasController');
const {Busca} = require('../controllers/BuscaController');


router.get('/',indexHome);
router.get('/cadastro', indexCadastro)
router.post('/cadastro', post)
router.get('/categorias', indexCategorias)
router.post('/busca', Busca)

router.criaRotaDinamica = function (url){
    router.get(url, Busca)
}

module.exports = router