const AdminModel = require("../model/Admin");
const userModel = require("../model/Usuarios");

async function validaId(req, res, next){
  const id = req.params.id;
  if(id === undefined || id === null || id === "") {
    res.status(400).json({ msg: "ID não informado!" });
    return;
  }
}
async function validaNome(req, res, next){
  const nome  = req.params.nome;
  if(nome === undefined || nome === null || nome === "") {
    res.status(400).json({ msg: "Nome não informado!" });
    return;
  }
}

async function validaPost(req, res, next) {
  const { nome, senha, confirmeSenha } = req.body;

  if (!nome) {
    console.log("AQUI PEGA BCT")
    res.status(400).json({ msg: "O nome é obrigatório!" });
    return;
  }
  if (!senha) {
    console.log("BOSTA DE ERRO DE MEDAAAAAA")
    res.status(400).json({ msg: "A senha é obrigatória!" });
    return;
  }
  if(senha !== confirmeSenha){
    res.status(400).json({ msg: "As senhas não são iguais!" });
    return;
  }
  next();
}

async function ehAdmin(req, res, next){
  const id = req.params.id;
  try {
    const user = await AdminModel.buscarID(id);
    if(!user || !user.nome.endsWith("admin")) {
      return res.status(401).json({msg: "Usuário não autorizado!"});
    }
    next();
  } catch (error) {
    res.status(500).json({msg: "Erro ao buscar usuário!"});
  }
}


async function usuarioOuAdmin(req, res, next){
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await userModel.findById(decoded._id);
    const admin = await AdminModel.findById(decoded._id);

    if (!user && !admin) {
      throw new Error();
    }

    if (!admin && user._id.toString() !== req.params.id) {
      return res.status(403).send({ error: 'Acesso negado.' });
    }

    req.token = token;
    req.user = user || admin;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Por favor, autentique.' });
  }
}
module.exports = {
  validaId: validaId,
  validaPost: validaPost,
  isAdmin:  ehAdmin,
  usuarioOuAdmin: usuarioOuAdmin,
  validaNome: validaNome
};
