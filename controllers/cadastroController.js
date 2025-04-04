//imports 
const Produto = require('../models/cadastroModel')
const Categorias = require('../models/categoriasModel')



// Controlador para a página principal
 async function indexCadastro(req, res, next) {
  const categoriasParaCadastro = await Categorias.find({})

  res.locals.categoriasParaCadastro = categoriasParaCadastro
    res.render('cadastro')
    next()
}

//trata o post do form do cadastro
 async function post(req, res, next) {
  await salvarProduto(req, res);
  next()
}


async function salvarProduto(req, res) {
  const { nome, valor, linkAfid, imagem, loja, categorias} = req.body;
  const {NomeDeExibicao} = req.body
  console.log(NomeDeExibicao)
  
  
  if(valor){
    console.log('entrei no cadastro de produto')
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
    
  if(NomeDeExibicao){
    console.log('entrei no cadastro de categoria')
    const {nome, NomeDeExibicao, SubCat1, SubCat2, SubCat3, nomeExib1, nomeExib2, nomeExib3 } = req.body
    const subcategorias = {
      sub1: {nome: SubCat1, NomeDeExibicao: nomeExib1},
      sub2:{nome: SubCat2, NomeDeExibicao: nomeExib2},
      sub3:{nome: SubCat3, NomeDeExibicao: nomeExib3}

     }
     console.log('at least entrei')
    try {
        // Criando o produto com os dados do formulário
        const categoriaSalva = await Categorias.create({
        nome,
        NomeDeExibicao,
        subcategorias
         
      });
  
      console.log('categoria salvo com sucesso:', categoriaSalva);
      res.redirect('/cadastro')
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Erro ao salvar produto', error: e });
    }


  }else{
    console.log('nao detectei o nome exibicao')
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