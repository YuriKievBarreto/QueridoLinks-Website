 function indexHome(req, res, next) {
    res.render('index')
    CarregaCategorias(req, res)
    next()
    
  }
