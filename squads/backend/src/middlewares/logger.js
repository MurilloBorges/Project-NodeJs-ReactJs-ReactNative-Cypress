'use strict'; //Melhora qualidade do código

const winston = require('winston'); //Importa biblioteca do winston
const path = require('path'); //Importa bilioteca de path dos arquivos no fonte
const fs = require('fs'); //Importa biblioteca de diretórios

const logDir = 'logs';//Define o nome do dirétorio a ser criado

//Cria o diretório caso o mesmo não exista
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = `${__dirname}/../${logDir}/log-api.log`; //Mapeia o diretório para salvar o arquivo de log

//Cria uma nova instância de logger do winston com dois transportes: Console, e File
const logger = winston.createLogger({   
  level: 'info', //Define o level do log
  handleExceptions: true,  
  format: winston.format.combine(    
    winston.format.simple(), //Define o tipo da mensagem     
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), //Define o horário
    //Pega o nome do arquivo em que foi feita a chamada de log
    winston.format.label({ label: path.basename(process.mainModule.filename) }),
    //Define a mensagem a ser mostrada
    winston.format.printf(info => `[${info.timestamp}] [${info.label}] ${info.level}: ${info.message}`)
  ),
  transports: [    
    //new winston.transports.Console(), //Mostra o log no console do servidor
    new winston.transports.File({ filename }) //Mostra o log no arquivo
  ],
  exitOnError: false, // não sai com exceções tratadas
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger; //Exporta o logger