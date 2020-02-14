//Importa o model de produto
const Produto = require('../models/Produto');

//Exportando o objeto do controller
module.exports = {
    //async e await são para requisições assincronas
    //busca uma lista de produtos
    async index( req, res ) {    
        //recupera o nome caso o mesmo seja informado no header    
        const { nome } = req.query;
        
        //Pesquisa os pordutos em que o nome seja igual ao informado no header, ou trás toda a collection de produtos
        const produtos = await Produto.find((nome != undefined ? {"nome": { $in: [nome] }} : undefined), function(e, result) {   
            //Seta status de ok
            res.status(200);                  
            if (e || result == null || result.length == 0) {                                            
                //retorna o info
                return res.json({info: 'Nenhum produto encontrado.'});                
            }
            else {                
                //retorna o produto
                return res.json(result);
            }            
        });
    },

    //busca um unico produto {:id}
    async show( req, res ) {                
        //Pesquisa o produto com base no id
        const produto = await Produto.findById(req.params.id, function(e, result) {   
            //Seta status de ok
            res.status(200);                                 
            if (e || result == null || result.length == 0) {                                            
                //retorna o info
                return res.json({info: 'Nenhum produto encontrado.'});                
            }
            else {                
                //retorna o produto
                return res.json(result);
            }            
        });
    },

    //Cria o produto
    async store( req, res) {        
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
                //Seta status de internal server error 
                res.status(500);
                //retorna o erro
                return res.json({info: 'falha ao salvar produto.'});                
            }
            else {
                //Seta status de created
                res.status(201);                
                //retorna o produto criado
                return res.json(result);
            }            
        });                
    },

    //Atualiza o produto
    async update( req, res) {
        //Recupera o id
        const filter = { _id: req.params.id };
        //Recupera o produto e altera seus valores com base no novo json, (new: true) - retorna o objeto alterado
        const produto = await Produto.findOneAndUpdate(filter, req.body, {new: true}, function(e, result) {                        
            if (e) {            
                //Seta status de internal server error 
                res.status(500);
                //retorna o erro
                return res.json({info: 'falha ao atualizar produto.'});                
            }
            else {
                //Seta status de ok
                res.status(200);                
                //retorna o produto criado
                return res.json(result);
            }            
        });        
    },

    //Remove o produto
    async delete( req, res) {
        //Recupera o produto com base no id e deleta o mesmo da base
        const produtos = await Produto.findByIdAndDelete(req.params.id, function(e, result) {                        
            if (e) {            
                //Seta status de internal server error 
                res.status(500);
                //retorna o erro
                return res.json({info: 'falha ao remover produto.'});                
            }
            else {
                //Seta status de ok
                res.status(200);                
                //retorna o produto criado
                return res.json(result);
            }            
        });       
    }
};