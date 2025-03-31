const Produto = require('../models/cadastroModel')

async function Busca(req, res, next) {
   
    const {busca} = req.body

    try {
        const produtos = await Produto.find({ nome: { $regex: busca, $options: 'i' } }); // Busca aproximada (case-insensitive)
        res.locals.produtosBusca = produtos
        res.locals.nomeBusca = busca
        console.log(produtos.length)
        
       
    } catch (error) {
     
    }    
    res.render('busca')

    


    

}

module.exports = {Busca}