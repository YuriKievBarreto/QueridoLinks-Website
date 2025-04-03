const Produto = require('../models/cadastroModel')
let produtos = []
async function middlewareGlobal (req, res, next){
    try{
        produtos = await await Produto.aggregate([{$sample: {size: 1000}}])
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
    ["camiseta", "Moda", 'moda'],
    ["celular", "Eletrônicos", 'eletronicos'],
    ["brinquedo-pet", "Para pets", 'para-pets'],
    ["acessorio", "Acessórios", 'acessorios'],
    ["fones-de-ouvido", "Áudio", 'audio'],
    ["corrida", "Fitness", 'fitness'],
    ["banho", "Banho", 'banho'],
    ["tenis-de-corrida", "Calçados", 'calcados'],
    ["engrenagem", "Ferramentas", 'ferramentas'],
    ["utilidades", "Utilidades", 'utilidades']
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
    const categoriasParaBusca = []
    for(let categoria of categorias){
        let stringFormatada = categoria[1]
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace('-', '')

        categoriasParaBusca.push(stringFormatada)
        res.locals.categoriasParaBusca = categoriasParaBusca
       
        let produtos = await Produto.aggregate([
        { $match: { categorias: { $in: [stringFormatada] } } }, // filtra pela categoria 
        { $sample: { size: 6 } } // pega 6 produtos aleatórios
        ])

        

        
        

        produtosCategorizados.push(produtos)

    }

    

      
      res.locals.categoriasH1 = categorias.map(subArray => subArray[1])
      res.locals.produtosCategorizados = produtosCategorizados
      
      next()
}
//reduz a string a X caracteres e adiciona ... no final
function cortaString(str){
    return str.length > 35 ? str.slice(0, 35) + "..." : str;
}



module.exports = {middlewareGlobal, SorteiaCategoria, produtosPorCategoria}