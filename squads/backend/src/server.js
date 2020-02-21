//Arquivo de configuração do servidor
//Importando biblioteca express que é uma função que quanto chamada cria um novo servidor, 
//que permite receber requisições e retornar respostas. (Server)
const express = require('express'); 
const logger = require('./middlewares/logger'); //Importando logging
const mongoose = require('mongoose'); //Importando biblioteca do mongoDB
const routes = require('./routes'); //Importando as rotas 
const morgan = require('morgan'); //Importando biblioteca de log das requisições
const cors = require('cors');

const server = express(); //Iniciando servidor

require("dotenv/config"); //Gerenciador de variáveis de ambiente

//Conexão com o banco de dados //cria o banco sozinho se não existir
mongoose.connect('mongodb+srv://squads:squads@cluster0-w8s7a.mongodb.net/squads?retryWrites=true&w=majority', {
    //define novo método de monitoramento de servidor e mecanismo.
    useUnifiedTopology: true,
    //especifica que está utilizando o novo formato
    useNewUrlParser: true
});

server.use(cors());
//Define interface de fluxo utilizada pelo winston, define também o formato da mensagem
server.use(morgan('":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" ":user-agent"', { stream: logger.stream })); 
server.use(express.json()); //Define que as informações a serem trasitadas nas requisições e respostas será em json 
server.use(routes); //adicionando as rotas dentro do server
server.listen(3333, () =>{
    logger.info('Server runing');
    console.log('Servidor HTTP online na porta 3333')
}); //habilitando porta 3333 no server