const Produto = require('../models/cadastroModel')
const Categorias = require('../models/categoriasModel')

let produtos = []
async function middlewareGlobal (req, res, next){
    try{
        produtos =  await Produto.aggregate([{$sample: {size: 1000}}])
        res.locals.produtos = produtos
        let produtosDinamicos = await Produto.aggregate([{$sample: {size: 30}}])
        
        produtosDinamicos.forEach(produto =>{
            produto.nome = cortaString(produto.nome)
            
        })

        
        
        res.locals.produtosDinamicos = produtosDinamicos

        let produtosShopee = produtosDinamicos.filter(produto => produto.loja == "shopee")

        produtosShopee = aleatorio(produtosShopee)
        function aleatorio(array) {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]]; 
            }
            return array;
        }
          
        res.locals.produtosShopee = produtosShopee

        
        
    }catch(e){
        console.log(`erro ao buscar produtos: ${e}`)
        res.locals.produtos = [];
    }


    
    next()
}

let categorias = []


//sorteia as categorias que vão ser exibidas no inicio da pagina inicial
async function SorteiaCategoria(req, res, next) {
    
   
    categorias = await Categorias.aggregate([{$sample: {size: 15}}])
    const categoriasDaVez = []; 
    const indicesUsados = new Set();

    
    while (categoriasDaVez.length < 10) {
        let indice = Math.floor(Math.random() * categorias.length);
        
        
        if (!indicesUsados.has(indice)){
            
            categoriasDaVez.push([categorias[indice].nome, categorias[indice].NomeDeExibicao]);
            indicesUsados.add(indice); 
            
        }
    }

    

    res.locals.categorias = categoriasDaVez;
    next();
}

async function produtosPorCategoria(req, res, next){
    let qtd = categorias.length * 6
    const produtosCategorizados = []
    const categoriasParaBusca = []
    for(let categoria of res.locals.categorias){ 
        let produtos = await Produto.aggregate([
        { $match: { categorias: { $in: [categoria[0]] } } }, 
        { $sample: { size: 6 } } 
        ])
        
        produtos.forEach(prod => {
            prod.nome = cortaString(prod.nome)
        })

        produtosCategorizados.push(produtos)

    }

    res.locals.produtosCategorizados = produtosCategorizados

   
    next()
}
//reduz a string a X caracteres e adiciona ... no final
function cortaString(str){
    return str.length > 35 ? str.slice(0, 35) + "..." : str;
}



module.exports = {middlewareGlobal, SorteiaCategoria, produtosPorCategoria, cortaString}