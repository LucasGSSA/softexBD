// app.js
const {Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config');
const ProdutoModel = require('./models/produto');
const sequelize = new Sequelize(config.development);
const Produto = ProdutoModel(sequelize, DataTypes);
async function run(){
    try {
        //criacao de um produto
        const produtoCriado = await Produto.create({
            nome: 'Produto A',
            preco: 19.99,
            descricao: 'Drescrição produto A'
        });
        console.log('Produto criado:', produtoCriado.toJSON());

        //leitura de produtos
        const produtos = await Produto.findAll();
        console.log('Produtos cadastrados:', produtos.map(p => p.toJSON()));

        //atualizacao de um produto
        const produtoAtualizado = await Produto.update(
            {preco: 29.99},
            {where: {id: produtoCriado.id } }
        );
        console.log(
            'produto atualizado:',
            produtoAtualizado[0] > 0 ? 'atualizado com sucesso' : 'produto nao encontrado'
        );
        //remocao de um produto
        const produtoRemovido = await Produto.destroy({where : { id: produtoCriado.id } });
        console.log(
            'produto removido:',
            produtoRemovido > 0 ? 'removido com sucesso' : 'produto nao encontrado'
        );
    }   catch(error) {
        console.error('Erro: ', error.message);
    }   finally{
        //fechar a conexao com o banco de dados ao final do script
        await Produto.sequelize.close();
    }
}
run();
