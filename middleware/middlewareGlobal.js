const Produto = require('../models/cadastroModel')
let produtos = []
async function middlewareGlobal (req, res, next){
    try{
        produtos = await Produto.find()
        res.locals.produtos = produtos
        let produtosDinamicos = await Produto.aggregate([{$sample: {size: 10}}])
        
        produtosDinamicos.forEach(produto =>{
            produto.nome = cortaString(produto.nome)
        })
        
        res.locals.produtosDinamicos = produtosDinamicos
        
        
        
    }catch(e){
        console.log(`erro ao buscar produtos: ${e}`)
        res.locals.produtos = [];
    }


    
    next()
}

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

//sorteia as categorias que vão ser exibidas no inicio da pagina inicial
function SorteiaCategoria(req, res, next) {
    
   
    
    const categoriasDaVez = []; 
    const indicesUsados = new Set();

    
    while (categoriasDaVez.length < 10) {
        let indice = Math.floor(Math.random() * 10);
        
        
        if (!indicesUsados.has(indice)) {
            categoriasDaVez.push(categorias[indice]);
            indicesUsados.add(indice); 
        }
    }

    

    res.locals.categorias = categoriasDaVez;
    next();
}

async function produtosPorCategoria(req, res, next){
    qtd = categorias.length * 6
    const produtosCategorizados = []

    for(let categoria of categorias){
        let stringFormatada = categoria[1]
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace('-', '')

        
        let produtos = await Produto.aggregate([
        { $match: { categorias: { $in: [stringFormatada] } } }, // Filtra pela categoria 
        { $sample: { size: 6 } } // Pega 6 produtos aleatórios
        ])

        
        

        produtosCategorizados.push(produtos)

    }

   
      
      res.locals.categoriasH1 = categorias.map(subArray => subArray[1])
      res.locals.produtosCategorizados = produtosCategorizados
      
      next()
}
//reduz a string a X caracteres e adiciona ... no final
function cortaString(str){
    return str.length > 50 ? str.slice(0, 35) + "..." : str;
}

module.exports = {middlewareGlobal, SorteiaCategoria, produtosPorCategoria}