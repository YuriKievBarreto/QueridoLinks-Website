require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes/routes')
const mongoose = require('mongoose')
const {middlewareGlobal, SorteiaCategoria, produtosPorCategoria} = require('./middleware/middlewareGlobal')


//conectando ao mongoDB atlas
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🎉 Conectado ao MongoDB!"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));
// Definindo EJS como view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos (CSS, JS) da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Para dados de formulário
app.use(express.json()); // Para dados em JSON

//middlewares globais
app.use(middlewareGlobal, SorteiaCategoria, produtosPorCategoria )
//usando arquivo de rotas
app.use(routes)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server http://localhost:${port}`);
  });
