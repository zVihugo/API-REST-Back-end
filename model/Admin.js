const mongoose = require("../helpers/banco");

const adminSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  senha: { type: String, required: true },
});

const adminModel = mongoose.model('Admin', adminSchema);

const salvar = async (nome, senha) => {
  const admin = await adminModel.create({ nome, senha });
  return admin;
};

const atualizar = async(id) => {
  const admin = await adminModel.findByIdAndUpdate(id);
  return admin;
};
const excluir = async(id) => {
  const admin = await adminModel.findByIdAndDelete({_id: id});
  return admin;
};
const buscar = async(nome) => {
  const admin = await adminModel.findOne({nome: nome});
  return admin;
};
const buscarID = async(id) => {
  const admin = await adminModel.findById({_id: id});
  return admin;
};
const listar = async() => {
  const admin = await adminModel.find();
  return admin;
};

module.exports = {
  listar,
  salvar,
  atualizar,
  buscar,
  excluir,
  buscarID
};
