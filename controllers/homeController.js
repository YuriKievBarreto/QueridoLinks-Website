const routes = require('../routes/routes')
const fs = require('fs')
const Produto = require('../models/categoriasModel')

// Controlador para a página principal
 async function indexHome(req, res, next) {
  res.render('index')
  next()
}

  
  



  

module.exports = {indexHome}