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
        const produtos = await Produto.find((nome != undefined ? {"nome": { $in: [nome] }} : undefined));        
        
        //retorna os produtos
        return res.json(produtos);
    },

    //busca um unico produto {:id}
    async show( req, res ) {                
        //Pesquisa o produto com base no id
        const produto = await Produto.findById(req.params.id);

        //Retorna o produto
        return res.json(produto);
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
        });

        //retorna o produto criado
        return res.json(produto);
    },

    //Atualiza o produto
    async update( req, res) {
        //Recupera o id
        const filter = { _id: req.params.id };
        //Recupera o produto e altera seus valores com base no novo json, (new: true) - retorna o objeto alterado
        const produto = await Produto.findOneAndUpdate(filter, req.body, {new: true});

        //retorna o produto alterado com os novos valores
        return res.json(produto);        
    },

    //Remove o produto
    async delete( req, res) {
        //Recupera o produto com base no id e deleta o mesmo da base
        const produtos = await Produto.findByIdAndDelete(req.params.id);

        //Retorna o produto o produto deletado
        return res.json(produtos);
    }
};