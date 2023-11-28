const AdminModel = require("../model/Admin");
const userModel = require("../model/Usuarios");
const jwt = require("jsonwebtoken");

async function isAuth(req, res, next ) {
  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.SECRET);

  if (!decoded) {
    return res.status(401).json({msg: "Usuário não authenticado!"});
  }

  next();
}

async function validaId(req, res, next){
  const id = req.params.id;
  
  if(id === undefined || id === null || id === "") {
    res.status(400).json({ msg: "ID não informado!" });
    return;
  }

  next();
}
async function validaNome(req, res, next){
  const nome = req.body.nome;
  if(nome === undefined || nome === null || nome === "") {
    res.status(400).json({ msg: "Nome não informado!" });
    return;
  }
  next()
}

async function validaPost(req, res, next) {
  const { nome, senha, confirmeSenha } = req.body;

  if (!nome) {
    res.status(400).json({ msg: "O nome é obrigatório!" });
    return;
  }
  if (!senha) {
    res.status(400).json({ msg: "A senha é obrigatória!" });
    return;
  }
  if(senha !== confirmeSenha){
    res.status(400).json({ msg: "As senhas não são iguais!" });
    return;
  }
  next();
}

async function usuarioOuAdmin(req, res, next){
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("token", decoded)
    const user = await userModel.buscarID(decoded.id);
    console.log("user", user)
    const admin = await AdminModel.buscarID(decoded.id);

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
  isAuth: isAuth,
  validaId: validaId,
  validaPost: validaPost,
  usuarioOuAdmin: usuarioOuAdmin,
  validaNome: validaNome
};
