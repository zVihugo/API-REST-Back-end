const mongoose = require("../helpers/banco");

const padariaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    endereco: { type: String, required: true }
});

const padariaModel = mongoose.model('Padaria', padariaSchema);

const produtoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Padaria' }
});

const produtoModel = mongoose.model('Produto', produtoSchema);

const salvarPadaria = async (nome, endereco) => {
    const padaria = await padariaModel.create({ nome, endereco });
    return padaria;
};
const salvarProduto = async (nome, preco, padaria) => {
    const produto = await produtoModel.create({ nome, preco, padaria });
    return produto;
};  
const atualizarPadaria = async(id) => {
    const padaria = await padariaModel.findByIdAndUpdate(id);
    return padaria;
};
const atualizarProduto = async(id) => {
    const produto = await produtoModel.findByIdAndUpdate(id);
    return produto;
};
const deletarPadaria = async(id) => {
    const padaria = await padariaModel.findByIdAndDelete(id);
    return padaria;
};
const deletarProduto = async(id) => {
    const produto = await produtoModel.findByIdAndDelete(id);
    return produto;
};
const buscarPadaria = async(nome) => {
    const padaria = await padariaModel.findOne({nome: nome});
    return padaria;
};
const buscarProduto = async(nome) => {
    const produto = await produtoModel.findOne({nome: nome});
    return produto;
};
const listarPadaria = async() => {
    const padaria = await padariaModel.find();
    return padaria;
};
const listarProduto = async() => {
    const produto = await produtoModel.find();
    return produto;
};

module.exports = {
    salvarPadaria,
    salvarProduto,
    atualizarPadaria,
    atualizarProduto,
    deletarPadaria,
    deletarProduto,
    buscarPadaria,
    buscarProduto,
    listarPadaria,
    listarProduto
};