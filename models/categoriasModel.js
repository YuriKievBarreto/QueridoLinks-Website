const mongoose = require('mongoose')

const categoriasSchema = new mongoose.Schema({
   categorias:[]
       
       
   
})
const Categorias = mongoose.model('Categorias', categoriasSchema);

module.exports = Categorias

