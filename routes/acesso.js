//Declarações e requisições
const express = require("express");
const router = express.Router();
const usuarios = require("../model/Usuarios");
const admins = require("../model/Admin");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const {validaNome, validaId, validaPost, usuarioOuAdmin, isAuth} = require("../helpers/middleware");

//configuração do dotenv
dotenv.config();

//Variavel 
const ADMIN = process.env.ADMIN_USER;

//Rota principal    
router.get("/", (req, res) => {
    res.json({ msg: "Bem vindo a rota de acesso" });
});


//rota para o registro
router.post("/registrar", validaPost, validaNome, async(req, res) => {
    const { nome, senha, confirmeSenha } = req.body;

    try{
        if(nome.includes(ADMIN)){
            res.status(400).json({msg: "Não é possivel continuar com a operação"});
        }else{
            let user = await usuarios.salvar(nome, senha);
            //console.log("teste", user)
            res.status(200).json({msg: "Usuário criado com sucesso", user, user });
        }
    }catch (e) {
        res.status(500).json({
            msg: "Aconteceu um erro no servidor.",
        });
    }
})

//Rota para login
router.post("/login", validaNome, async(req, res)=>{
    const {nome, senha} = req.body;

    try{
        let user;
        user = await admins.buscar(nome);
        if(!user){
            user = await usuarios.buscar(nome);
        }
        if(user.senha === senha){
            const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: '12h'});
            res.status(200).json({msg: "Login realizado com sucesso", token: token});
        } else {
            res.status(400).json({msg: "Senha incorreta"});
        }
    }catch(e){
        res.status(400).json({msg: "Usuário não encontrado"});
    }
})

//Rota admin cria admin
router.post("/admin", validaPost, usuarioOuAdmin, async(req, res) => {
    const { nome, senha, confirmeSenha } = req.body;

    try {
        const user = await admins.salvar(nome, senha);
        res.status(201).json({ msg: "Administrador criado com sucesso",user: user });
    } catch (e) {
        res.status(500).json({
            msg: "Aconteceu um erro no servidor.",
        });
    }
});

//Rota criada somente para o teste do middleware isAuth
router.get("/visualizar/:id", isAuth, (req, res) =>{
    try {
      res.status(200).json({msg: "Teste para ver se o isAuth está funcionando"});  
    } catch (e) {
        res.status(403).json({msg: "Acesso negado!"});
    }
})

//Rota exclusão usuario por admin
router.delete("/excluir/:id", validaId, usuarioOuAdmin, async(req, res) => {
    const id = req.params.id
    try {
        const user = await usuarios.excluir(id);
        const admin = await admins.excluir(id);
        if(user) {
            res.status(200).json({ msg: "Usuário excluido com sucesso!" });
        } else if(admin) {
            res.status(200).json({ msg: "Administrador excluído com sucesso!"});
        }
        if(!user || !admin) {
            res.status(400).json({msg: "Registros já foram deletados!"});
        }
    } catch (e) {
        res.status(400).json({ msg: "Usuário ou Administrador não encontrado!" });
    }
});

//Rota alterar dados pessoais 
router.put('/alterar/:id', validaId, isAuth, async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await usuarios.buscarID(decoded.id);
    const admin = await admins.buscarID(decoded.id);
    const nome = req.body.nome;
    if(user){
        if(user._id.toString() !== req.params.id){
            res.status(401).json({msg: "Usuário comum não autorizado a alterar dados de outros usuários"});
        }
        else if(user._id.toString() === req.params.id){
            try {
                const user = await usuarios.atualizar(req.params.id, nome);
                res.status(200).json({ msg: "Você se alterou com sucesso!", user: user });
            } catch (e) {
                res.status(500).json({ msg: "Aconteceu um erro no servidor." });
            }
        }
    }else if(admin){
        try {
            const user = await admins.atualizar(req.params.id, nome);
            res.status(200).json({ msg: "Usuário atualizado com sucesso", user: user });
        } catch (e) {
            res.status(500).json({ msg: "Aconteceu um erro no servidor." });
        }
    }
});
module.exports = router;