const mongoose = require("../helpers/banco");

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    senha: { type: String, required: true },
});

const userModel = mongoose.model('User', userSchema);

const salvar = async (nome, senha) => {
    const user = await userModel.create({ nome, senha });
    return user;
};

const atualizar = async(id, nome) => {
    const user = await userModel.findByIdAndUpdate(id, {nome: nome}, {new: true});
    return user;
};
const excluir = async(id) => {
    const user = await userModel.findByIdAndDelete({_id: id});
    return user;
};
const buscar = async(nome) => {
    const user = await userModel.findOne({nome: nome});
    return user;
};
const listar = async() => {
    const user = await userModel.find();
    return user;
};
const buscarID   = async(id) => {
    const user = await userModel.findById({_id: id});
    return user;
};

module.exports = {
    salvar,
    atualizar,
    excluir,
    buscar,
    listar,
    buscarID
};