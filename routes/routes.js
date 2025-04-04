const express = require('express');
const router = express.Router();
const {indexHome} = require('../controllers/homeController');
const {indexCadastro, post} = require('../controllers/cadastroController');
const {indexCategorias} = require('../controllers/categoriasController');
const {Busca} = require('../controllers/BuscaController');

const Categorias = require('../models/categoriasModel')


router.get('/',indexHome);
router.get('/cadastro', indexCadastro)
router.post('/cadastro', post)
router.get('/categorias', indexCategorias)
router.post('/busca', Busca)

CarregaCategorias()

async function CarregaCategorias(){
    const categoriasCarregadas = await Categorias.find({})
    categoriasCarregadas.forEach(categoria => {
        router.get(`/categorias:${categoria.nome}`,Busca)
        
    });

    
}




module.exports = router