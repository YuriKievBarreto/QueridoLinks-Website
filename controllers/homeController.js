const routes = require('../routes/routes')
const fs = require('fs')
const Produto = require('../models/categoriasModel')

// Controlador para a página principal
 async function indexHome(req, res, next) {
  const documentos = await Produto.find({})
  documentos.forEach(e => {
    console.log(e.nome)
    console.log(e.subcategorias.sub1.NomeDeExibicao)
    console.log(e.subcategorias.sub2.NomeDeExibicao)
    console.log(e.subcategorias.sub3.NomeDeExibicao)
  })
   



  res.render('index')
  
  
  next()
  
}

  
  



  

module.exports = {indexHome}