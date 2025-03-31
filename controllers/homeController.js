


// Controlador para a página principal
 function indexHome(req, res, next) {
    res.render('index')
    console.log(res.locals.categorias)
    next()
    
  }

  async function CarregaCategorias(){
    
  }



  

module.exports = {indexHome}