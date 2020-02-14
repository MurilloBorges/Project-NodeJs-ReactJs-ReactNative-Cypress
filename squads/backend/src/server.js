//Arquivo de configuração do servidor
//Importando biblioteca express que é uma função que quanto chamada cria um novo servidor, 
//que permite receber requisições e retornar respostas. (Server)
const express = require('express'); 
const mongoose = require('mongoose'); //Importando biblioteca do mongoDB
const routes = require('./routes'); //Importando as rotas 

const server = express(); //Iniciando servidor

//Conexão com o banco de dados //cria o banco sozinho se não existir
mongoose.connect('mongodb+srv://squads:squads@cluster0-w8s7a.mongodb.net/squads?retryWrites=true&w=majority', {
    //especifica que está utilizando o novo formato
    useNewUrlParser: true
});

server.use(express.json()); //Define que as informações a serem trasitadas nas requisições e respostas será em json 
server.use(routes); //adicionando as rotas dentro do server
server.listen(8080); //habilitando porta 8080 no server