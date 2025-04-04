const mongoose = require('mongoose')
//modelo a ser aplicado
const categoriasSchema = new mongoose.Schema({
   nome: String,
   NomeDeExibicao: String,
   subcategorias:{
      sub1: {nome: String, NomeDeExibicao: String},
      sub2: {nome: String, NomeDeExibicao: String},
      sub3: {nome: String, NomeDeExibicao: String}
   } 
})

/*const categoriasSchema = new mongoose.Schema({
   categorias:[]
      
})*/


const Categorias = mongoose.model('Categorias', categoriasSchema);


module.exports = Categorias

