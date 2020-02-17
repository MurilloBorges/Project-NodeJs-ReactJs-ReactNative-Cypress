const jwt = require('jsonwebtoken'); //Importa biblioteca de jwt
const { promisify } = require('util'); //Converte uma callback em promise
const logger = require('../middlewares/logger'); //Importa biblioteca de logger

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization; //recupera o token da requisição
    
    if (!authHeader) {
        logger.info('Retorno: Token não fornecido')
        return res.status(401).json({ info: 'Token não fornecido' });        
    }
    //Divide a string e armazena o token dentro da variavel token (retira o bearer da frente do token)
    const [, token] = authHeader.split(' '); 

    try {           
        //Pega a callback do jwt transforma em promise com o promisify 
        //Passa o token como parâmetro e recupera o token, e valida se o token é válido
        const decoded = await promisify(jwt.verify)(token, process.env.SECRET);        
        //Se o token for válido pega o id do usuário criado no jwt no caso 1,
        //e joga no request da aplicação, que então pode ser usado em todo lugar da aplicação através de req.userId
        req.userId = decoded.id;
        //Argumento de retorno de chamada para a função de middleware, continua a requisição
        return next();
    } catch (e) {
        //Se o token não é valido cai no error
        logger.error(e).info('Retorno: Token inválido')
        return res.status(401).json({ info: 'Token inválido' });
    }
};