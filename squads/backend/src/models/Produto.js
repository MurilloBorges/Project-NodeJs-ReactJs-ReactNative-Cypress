//Desestrutura o objeto mongoose e utiliza apenas o schema e o model
const { Schema, model } = require('mongoose');

//Cria a estrura de collection do produto para armazenar no banco de dados
const ProdutoSchema = new Schema({
    nome: { 
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    valor: {
        type: Number,
        required: true,
    }    
}, {
    //Cria uma coluna de forma automática chamada createdAt e updateAt dentro de cada registro que for salvo na base de dados
    //createAt - salva a data forma automática na inserção do registro
    //updateAt - salva a data da última modificação do registro
    timestamps: true,
});

//Exporta o model. Primeiro parametro nome do model, segundo o schema.
module.exports = model('Produto', ProdutoSchema);