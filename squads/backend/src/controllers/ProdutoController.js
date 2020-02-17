//Importa o model de produto
const Produto = require('../models/Produto');
const logger = require('../middlewares/logger'); //Importando logging

//Exportando o objeto do controller
module.exports = {
    //async e await são para requisições assincronas
    //busca uma lista de produtos
    async index( req, res ) {    
        try {
            //recupera o nome caso o mesmo seja informado no header    
            const { nome } = req.query;                   
            //Pesquisa os pordutos em que o nome seja igual ao informado no header, ou trás toda a collection de produtos
            const produtos = await Produto.find((nome != undefined ? {"nome": { $in: [nome] }} : undefined), function(e, result) {   
                //Seta status de ok
                res.status(200);                  
                if (e || result == null || result.length == 0) {  
                    logger.error(e).info('Retorno: Nenhum produto encontrado.');
                    return res.json({info: 'Nenhum produto encontrado.'});                
                }
                else {                
                    //retorna o produto
                    return res.json(result);
                }            
            });
        } catch (e) {                        
            logger.error(e).info('Retorno: Nenhum produto encontrado.');
            return res.status(500).json({info: 'Nenhum produto encontrado.'});
        }
    },

    //busca um unico produto {:id}
    async show( req, res ) { 
        try {               
            //Pesquisa o produto com base no id
            const produto = await Produto.findById(req.params.id, function(e, result) {   
                //Seta status de ok
                res.status(200);                                 
                if (e || result == null || result.length == 0) {
                    logger.error(e).info('Retorno: Nenhum produto encontrado.');                                                              
                    return res.json({info: 'Nenhum produto encontrado.'});                
                }
                else {                
                    //retorna o produto
                    return res.json(result);
                }            
            });
        } catch (e) {
            logger.error(e).info('Retorno: Nenhum produto encontrado.');
            return res.status(500).json({info: 'Nenhum produto encontrado.'});
        }
    },

    //Cria o produto
    async store( req, res) {
        try {        
            //Recupera o valor do json no body em um objeto
            const { nome, descricao, valor } = req.body;            

            //valida se já existe um produto com o nome
            const produtoExiste = await Produto.findOne({ nome });

            //se já existe um produto com o nome, retorna ele
            if (produtoExiste) {
                return res.json(produtoExiste);
            }        

            //caso não exista, cria o produto na base
            const produto = await Produto.create({
                nome,
                descricao,
                valor
            }, function(e, result) {                        
                if (e) {     
                    logger.error(e).info(JSON.stringify(req.body));
                    //Seta status de internal server error e retorna o erro
                    return res.status(500).json({info: 'falha ao salvar produto.'});                
                }
                else {
                    //Seta status de created e retorna o produto criado
                    return res.status(201).json(result);
                }            
            });                
        } catch (e) {
            logger.error(e).info(JSON.stringify(req.body));
            return res.status(500).json({info: 'falha ao salvar produto.'});
        }
    },

    //Atualiza o produto
    async update( req, res) {
        try {
            //Recupera o id
            const filter = { _id: req.params.id };
            //Recupera o produto e altera seus valores com base no novo json, (new: true) - retorna o objeto alterado
            const produto = await Produto.findOneAndUpdate(filter, req.body, {new: true}, function(e, result) {                        
                if (e || result == null || result.length == 0) { 
                    logger.error(e).info(JSON.stringify(req.body));                    
                    return res.status(500).json({info: 'falha ao atualizar produto.'});                
                }
                else {                    
                    return res.status(200).json(result);
                }            
            });        
        } catch (e) {
            logger.error(e).info(JSON.stringify(req.body));
            return res.status(500).json({info: 'falha ao atualizar produto.'});
        }
    },

    //Remove o produto
    async delete( req, res) {
        try {
            //Recupera o produto com base no id e deleta o mesmo da base
            const produtos = await Produto.findByIdAndDelete(req.params.id, function(e, result) {                        
                if (e || result == null || result.length == 0) { 
                    logger.error(e).info('Retorno: falha ao remover produto.');                               
                    return res.status(500).json({info: 'falha ao remover produto.'});                
                }
                else {                    
                    return res.status(200).json(result);
                }            
            });        
        } catch (e) {
            logger.error(e).info('Retorno: falha ao remover produto.');
            return res.status(500).json({info: 'falha ao remover produto.'});        
        }       
    }
};