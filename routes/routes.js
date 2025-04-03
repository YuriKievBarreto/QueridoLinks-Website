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

/*CarregaCategorias()

async function CarregaCategorias(){
    const categoriasParaCadastro = await Categorias.find({},{ categorias: 1, _id: 0 })
    const categoriasCarregadas = categoriasParaCadastro[0].categorias

    for(let categoria of categoriasCarregadas){
    router.get(`/categorias:${categoria}`,Busca)
    }
    
}*/




module.exports = router