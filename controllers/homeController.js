// Controlador para a página principal
 function indexHome(req, res, next) {
    res.render('index')
    next()
    
  }

  

module.exports = {indexHome}