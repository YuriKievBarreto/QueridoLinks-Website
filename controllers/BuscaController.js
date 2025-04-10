const Produto = require('../models/cadastroModel')
const Categorias = require('../models/categoriasModel')
const {cortaString} = require('../middleware/middlewareGlobal')

async function Busca(req, res, next) {
    
    const {busca} = req.body
   
    //exibe produtos referentes a busca
    if(busca){
       
        try {
            
            const produtos = await Produto.find({ nome: { $regex: busca, $options: 'i' } }); 
            res.locals.produtosBusca = produtos
            res.locals.nomeBusca = busca
            
            
           
        } catch (error) {
         console.log(error)
        }    
    }

   
    //exibe as categorias
   if(req.params && !busca){

    let categoria = Object.values( req.params)[0].replace(':', '')
    
    const produtosCrus = res.locals.produtos
    const produtosDaCategoria = produtosCrus.filter(produto => produto.categorias.some(
        elemento => elemento === categoria

    ))

    produtosDaCategoria.forEach( prod => {
        prod.nome = cortaString(prod.nome)
    })

    res.locals.produtosDaCategoria = produtosDaCategoria
    res.locals.categoria = categoria
    
   
     //pega os produtos das 3 subcategorias referentes a categoria do produto
     let {subcategorias} = await Categorias.findOne({nome: categoria})
     subcategorias = Object.values(subcategorias)
     res.locals.subcategorias = subcategorias
 
     let produtosSubCat = []
     for(let subcat of subcategorias){
         let produtosDaSubCat = await Produto.aggregate([
             { $match: { categorias: {$in: [subcat.nome] } } },
             { $sample: {size: 12}}
         ])
 
         produtosDaSubCat.forEach(produto => {
            produto.nome = cortaString(produto.nome)
         })
         produtosSubCat.push(produtosDaSubCat)
        }

         res.locals.produtosSubCat = produtosSubCat
   }

   

   
    
    

    res.render('busca')

}

module.exports = {Busca}