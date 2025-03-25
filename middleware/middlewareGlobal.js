const Produto = require('../models/cadastroModel')
let produtos = []
async function middlewareGlobal (req, res, next){
    try{
        produtos = await Produto.find()
        res.locals.produtos = produtos
        let produtosDinamicos = await Produto.aggregate([{$sample: {size: 10}}])
        res.locals.produtosDinamicos = produtosDinamicos
        console.log(produtosDinamicos)
        
    }catch(e){
        console.log(`erro ao buscar produtos: ${e}`)
        res.locals.produtos = [];
    }


    
    next()
}

module.exports = middlewareGlobal