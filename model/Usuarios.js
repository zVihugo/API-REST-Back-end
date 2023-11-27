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

const atualizar = async(id) => {
    const user = await userModel.findByIdAndUpdate(id);
    return user;
};
const deletar = async(id) => {
    const user = await userModel.findByIdAndDelete(id);
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

module.exports = {
    salvar,
    atualizar,
    deletar,
    buscar,
    listar
};