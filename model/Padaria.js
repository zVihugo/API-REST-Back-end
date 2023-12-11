const mongoose = require("../helpers/banco");

const padariaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
});

const padariaModel = mongoose.model("Padaria", padariaSchema);

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Padaria" },
});

const produtoModel = mongoose.model("Produto", produtoSchema);

const salvarPadaria = async (nome) => {
  const padaria = await padariaModel.create(nome);
  return padaria;
};
const salvarProduto = async (nome, preco, padariaNome) => {
  console.log("Padaria", padariaNome);
  const padaria = await padariaModel.findOne({ nome: padariaNome });
  console.log("Padaria: ", padaria);
  if (!padaria) {
    throw new Error("Padaria não encontrada");
  }
  const produto = await produtoModel.create({ nome, preco, owner: padaria });
  return produto;
};
const atualizarPadaria = async (id, nome) => {
  const padaria = await padariaModel.findByIdAndUpdate(id, { nome: nome }, {new: true});
  return padaria;
};
const atualizarProduto = async (id, nome, preco) => {
  const produto = await produtoModel.findByIdAndUpdate(
    id,
    {nome: nome, preco: preco}, {new: true}
  );
  return produto;
};
const deletarPadaria = async (id) => {
  const padaria = await padariaModel.findByIdAndDelete(id);
  return padaria;
};
const deletarProduto = async (id) => {
  const produto = await produtoModel.findByIdAndDelete(id);
  return produto;
};
const buscarPadaria = async (nome) => {
  const padaria = await padariaModel.findOne({ nome: nome });
  return padaria;
};
const buscarProdutoNaPadaria = async (nome, id) => {
  const padaria = await produtoModel.findOne({ nome: nome, owner: id });
  return padaria;
};
const buscarpID = async (id) => {
  const produto = await produtoModel.findById({ _id: id });
  return produto;
};
const buscarID = async (id) => {
  const padaria = await padariaModel.findById({ _id: id });
  return padaria;
};
const buscarProduto = async (nome) => {
  const produto = await produtoModel.findOne({ nome: nome });
  return produto;
};
const listarPadaria = async () => {
  const padaria = await padariaModel.find();
  return padaria;
};
const listarProduto = async () => {
  const produto = await produtoModel.find();
  return produto;
};
const paginarPadaria = async (limite, contador) => {
    const padarias = await padariaModel.find().skip(contador).limit(limite);
    return padarias;
};
const paginarProduto = async (limite, contador) => {
  const produtos = await produtoModel.find().skip(contador).limit(limite);
  return produtos;
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
  listarProduto,
  buscarID,
  buscarpID,
  buscarProdutoNaPadaria,
  padariaModel,
  produtoModel,
  paginarPadaria,
  paginarProduto
};
