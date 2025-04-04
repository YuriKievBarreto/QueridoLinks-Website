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
    let {subcategorias} = await Categorias.findOne({nome: categoria})
    subcategorias = Object.values(subcategorias)
    res.locals.subcategorias = subcategorias
    console.log("--------------------------------")
    console.log(res.locals.subcategorias)
    console.log("--------------------------------")
    let produtosSubCat = []
    for(let subcat of subcategorias){
        let produtosDaSubCat = await Produto.find({ categorias: {$in: [subcat.nome]}})
        produtosSubCat.push(produtosDaSubCat)
    }

    console.log("--------------------------------")
    produtosSubCat[2].forEach(elem => (console.log(elem)))
    console.log("--------------------------------")
    
    res.locals.produtosSubCat = produtosSubCat

    res.render('busca')

}

module.exports = {Busca}