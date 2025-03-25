const express = require('express');
const router = express.Router();
const {indexHome} = require('../controllers/homeController');
const {indexCadastro, post} = require('../controllers/cadastroController');

router.get('/', indexHome);
router.get('/cadastro', indexCadastro)
router.post('/cadastro', post)


module.exports = router