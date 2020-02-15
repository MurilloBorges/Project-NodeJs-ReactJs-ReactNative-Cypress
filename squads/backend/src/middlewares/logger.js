'use strict'; //Melhora qualidade do código
const winston = require('winston'); //Importa biblioteca do winston
const moment = require('moment'); //Importa biblioteca de data
const path = require('path'); //Importa bilioteca de path dos arquivos no fonte

//Mapeia o diretório para salvar o arquivo de log
const filename = `${__dirname}/../logs/log-api.log`;
//Cria o formato de data
const tsFormat = () => moment().format('YYYY-MM-DD hh:mm:ss').trim();

// Create a new winston logger instance with two tranports: Console, and File
const logger = winston.createLogger({ 
  //Define o level do log
  level: 'info',   
  format: winston.format.combine(
    //Define o tipo da mensagem
    winston.format.simple(),
    //Define o horário
    winston.format.timestamp({format: tsFormat}),
    //Pega o nome do arquivo em que foi feita a chamada de log
    winston.format.label({ label: path.basename(process.mainModule.filename) }),
    //Define a mensagem a ser mostrada
    winston.format.printf(info => `[${info.timestamp}] [${info.label}] ${info.level}: ${info.message} `)
  ),
  transports: [
    //Mostra o log no console do servidor
    new winston.transports.Console(),
    //Mostra o log no arquivo
    new winston.transports.File({ filename })
  ]
});

module.exports = logger;