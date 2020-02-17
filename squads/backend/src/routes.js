//Arquivo de configuração das rotas
const express = require('express'); //Importando express (server)
const ProdutoController = require('./controllers/ProdutoController'); //Importando controller do produto
const authController = require('./controllers/authController'); //Importando controller de autenticação
const authMiddleware = require('./middlewares/auth') //Importando biblioteca de autorização do token;

//Cria um objeto específico para rotas
const routes = express.Router();

//Criação das rotas
routes.post('/login', authController.store); //post de autenticação

// Middleware para validar o token
// Colocar todas as rotas que deverão ter token abaixo deste middleware
routes.use(authMiddleware);

routes.get('/produtos', ProdutoController.index); //get all (select) ou get by nome
routes.get('/produtos/:id', ProdutoController.show); //get by id do produto (select)
routes.post('/produtos', ProdutoController.store); //post do produto (insert)
routes.patch('/produtos/:id', ProdutoController.update); //patch do produto (update)
routes.delete('/produtos/:id', ProdutoController.delete); //delete do produto (delete)

//Exporta as rotas para o server
module.exports = routes;