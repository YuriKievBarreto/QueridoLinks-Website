const mongoose = require('mongoose')

const produtoSchema = new mongoose.Schema({
    nome: String,
    valor: String,
    linkAfid: String,
    imagem: String,
    loja: String,
    categorias: [String],
    subcategorias:[String]
})


const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto

