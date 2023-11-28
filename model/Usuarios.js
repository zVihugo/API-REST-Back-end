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
const deletar = async(nome) => {
    const user = await userModel.deleteOne({nome: nome});
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
    deletar,
    buscar,
    listar,
    buscarID
};