const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes/routes')

// Definindo EJS como view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos (CSS, JS) da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

//usando arquivo de rotas
app.use(routes)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server http://localhost:${port}`);
  });
