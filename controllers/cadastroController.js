//imports 
const Produto = require('../models/cadastroModel')



// Controlador para a página principal
 function indexCadastro(req, res, next) {
    res.render('cadastro')
    next()
    
}

//trata o post do form do cadastro
 async function post(req, res, next) {
  console.log('Estou rodando');
  await salvarProduto(req, res);
}


async function salvarProduto(req, res) {
  const { nome, valor, linkAfid, imagem, loja, categorias } = req.body;
  
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



module.exports = {
  indexCadastro,
  post,
}