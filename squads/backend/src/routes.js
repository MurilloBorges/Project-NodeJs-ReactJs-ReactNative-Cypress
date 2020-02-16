//Arquivo de configuração das rotas
const express = require('express'); //Importando express (server)
const ProdutoController = require('./controllers/ProdutoController'); //Importando controller do produto
const authController = require('./controllers/authController'); //Importando controller de autenticação
const auth = require('./middlewares/auth') //Importando biblioteca de autorização do token;

//Cria um objeto específico para rotas
const routes = express.Router();

//Criação das rotas
//routes.get('produtos', auth.verifyJWT(), ProdutoController.index); //get all (select) ou get by nome
//routes.get('produtos/:id', auth.verifyJWT(), ProdutoController.show); //get by id do produto (select)
//routes.post('produtos', auth.verifyJWT(), ProdutoController.store); //post do produto (insert)
//routes.patch('produtos/:id', auth.verifyJWT(), ProdutoController.update); //patch do produto (update)
//routes.delete('produtos/:id', auth.verifyJWT(), ProdutoController.delete); //delete do produto (delete)
//routes.post('login', authController.store); //post de autenticação
//routes.get('logout', authController.show); //get de logout do usuário

//Exporta as rotas para o server
module.exports = routes;