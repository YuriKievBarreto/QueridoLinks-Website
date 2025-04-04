const Categorias = require('../models/categoriasModel')

async function indexCategorias(req, res){
    res.render('categorias')
}

module.exports = {indexCategorias}