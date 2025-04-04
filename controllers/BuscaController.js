const Produto = require('../models/cadastroModel')
const Categorias = require('../models/categoriasModel')

async function Busca(req, res, next) {
    let categoria = Object.values( req.params)[0].replace(':', '')
    const {busca} = req.body
    console.log(busca)
    //exibe produtos referentes a busca
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

    //exibe as categorias
   if(req.params && !busca){
    console.log('entrei no if de de parametros')
    const produtosCrus = res.locals.produtos
    const produtosDaCategoria = produtosCrus.filter(produto => produto.categorias.some(
        elemento => elemento === categoria

    ))

    res.locals.produtosDaCategoria = produtosDaCategoria
    res.locals.categoria = categoria
    
   
   }

    //pega os produtos das 3 subcategorias referentes a categoria do produto
    const {subcategorias} = await Categorias.findOne({nome: categoria})
    
    res.locals.subcategorias = Object.values(subcategorias)


    res.render('busca')

}

module.exports = {Busca}