const routes = require('../routes/routes')



// Controlador para a página principal
 function indexHome(req, res, next) {
    res.render('index')
    CarregaCategorias(req, res)
    next()
    
  }

  async function CarregaCategorias(req, res){
    try{
      res.locals.categorias.forEach(categoria => {
        routes.criaRotaDinamica(categoria[0])
        console.log('criando rota')
      });
    }catch(e){
      console.log('erro ao criar rota dinamica: ', e)
    }
  }



  

module.exports = {indexHome}