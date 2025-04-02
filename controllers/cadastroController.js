//imports 
const Produto = require('../models/cadastroModel')
const Categorias = require('../models/categoriasModel')



// Controlador para a página principal
 async function indexCadastro(req, res, next) {
  const categoriasParaCadastro = await Categorias.find(
    {},
    { categorias: 1, _id: 0 }
  )
  res.locals.categoriasParaCadastro = categoriasParaCadastro[0].categorias
  console.log( res.locals.categoriasParaCadastro)
  
    res.render('cadastro')
    next()
}

//trata o post do form do cadastro
 async function post(req, res, next) {
  console.log('Estou rodando');
  await salvarProduto(req, res);
}


async function salvarProduto(req, res) {
  const { nome, valor, linkAfid, imagem, loja, categorias, nomeCat } = req.body;
  
  if(nome){
    try {
      // Criando o produto com os dados do formulário
      const produtoSalvo = await Produto.create({
        nome,
        valor,
        linkAfid,
        imagem,
        loja,
        categorias
      });
  
      console.log('Produto salvo com sucesso:', produtoSalvo);
      res.redirect('/cadastro')
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Erro ao salvar produto', error: e });
    }
  }

  if(nomeCat){
    

    

    
    

    try{
      const categoria = await Categorias.findByIdAndUpdate('67eaf98dd5cedcaf35e53938', // Filtro para encontrar o documento
        { $push: { categorias: nomeCat } },
        {new: true} 
      )

      
      console.log('categoria registrada')
      res.redirect('/cadastro')
    }catch(e){
      console.log('erro ao registrar categoria: ', e)
    }


  }
 


}



class ProdutoLocal{
  constructor(nome, valor, linkAfid, imagem, loja, categorias){
    this.nome = nome
    this.valor = valor
    this.linkAfid = linkAfid
    this.imagem = imagem
    this.loja = loja
    this.categorias = categorias
  }
}

async function AdicionaCategoria(req, res){

}



module.exports = {
  indexCadastro,
  post,
}