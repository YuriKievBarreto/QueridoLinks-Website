const Produto = require('../models/cadastroModel')

async function Busca(req, res, next) {
   
    const {busca} = req.body
    console.log(busca)

    if(busca){
        console.log('entrei no if de busca')
        try {
            console.log('tentei')
            const produtos = await Produto.find({ nome: { $regex: busca, $options: 'i' } }); 
            res.locals.produtosBusca = produtos
            res.locals.nomeBusca = busca
            console.log(produtos.length)
            
           
        } catch (error) {
         console.log(error)
        }    
    }


   if(req.params && !busca){
    console.log('entrei no if de de parametros')
    let categoria = Object.values( req.params)[0].replace(':', '')
    const produtosCrus = res.locals.produtos
    const produtosDaCategoria = produtosCrus.filter(produto => produto.categorias.some(
        elemento => elemento === categoria

    ))

    res.locals.produtosDaCategoria = produtosDaCategoria
    res.locals.categoria = categoria
    
   }


    res.render('busca')

}

module.exports = {Busca}