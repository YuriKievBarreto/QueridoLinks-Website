// Controlador para a página principal
 function indexHome(req, res, next) {
    res.render('index')
    next()
    
  }

  //sorteia as categorias que vão ser exibidas no inicio da pagina inicial
  function SorteiaCategoria(req, res, next) {
    console.log('rodando aqui')
    const categorias = [
        ["camiseta", "Moda"],
        ["celular", "Eletrônicos"],
        ["brinquedo-pet", "Para pets"],
        ["acessorio", "Acessórios"],
        ["fones-de-ouvido", "Áudio"],
        ["corrida", "Fitness"],
        ["banho", "Banho"],
        ["tenis-de-corrida", "Calçados"],
        ["engrenagem", "Ferramentas"],
        ["utilidades", "Utilidades"]
    ];
    
    const categoriasDaVez = [];
    const indicesUsados = new Set(); 
    
    while (categoriasDaVez.length < 3) {
        let indice = Math.floor(Math.random() * 10);
        
        
        if (!indicesUsados.has(indice)) {
            categoriasDaVez.push(categorias[indice]);
            indicesUsados.add(indice); 
        }
    }

    res.locals.categorias = categoriasDaVez;
    console.log(categoriasDaVez)
    next();
}

module.exports = {indexHome, SorteiaCategoria}