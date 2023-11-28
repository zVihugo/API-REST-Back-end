//Declarações e requisições
const express = require("express");
const router = express.Router();
const usuarios = require("../model/Usuarios");
const admins = require("../model/Admin");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const {validaNome, validaId, validaPost, isAdmin, usuarioOuAdmin} = require("../helpers/middleware");

//configuração do dotenv
dotenv.config();

//Variavel 
const ADMIN = process.env.ADMIN_USER;

//Rota principal    
router.get("/", (req, res) => {
    res.json({ msg: "Bem vindo a rota de acesso" });
});

//rota para o registro
router.post("/registrar", validaPost, async(req, res) => {
    const { nome, senha, confirmeSenha } = req.body;

    try {
        let user;
        if (nome.endsWith(ADMIN)) {
            user = await admins.salvar(nome, senha);
            res.status(201).json({ msg: "Administrador criado com sucesso",user: user });
        } else {
            user = await usuarios.salvar(nome, senha);
            res.status(201).json({ msg: "Usuário criado com sucesso",user: user });
        }
    } catch (e) {
        res.status(500).json({
            msg: "Aconteceu um erro no servidor.",
        });
    }
})

//Rota para login

router.post("/login", async(req, res)=>{
    const {nome, senha} = req.body;

    try{
        let user;
        if(nome.endsWith(ADMIN)){
            user = await admins.buscar(nome);
        }else{
            user = await usuarios.buscar(nome);
        }
        if(user.senha === senha){
            const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: 3000});
            res.status(200).json({msg: "Login realizado com sucesso", token: token});
        }else{
            res.status(400).json({msg: "Senha incorreta"});
        }
    }catch(e){
        res.status(400).json({msg: "Usuário não encontrado"});
    }
})

//Rota admin cria admin
router.post("/admin/:id", validaPost, isAdmin, async(req, res) => {
    const id = req.params.id;
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

//Rota exclusão usuario por admin
router.delete("/excluir/:nome", validaNome, usuarioOuAdmin, async(req, res) => {
    const nome = req.params.nome;
    try {
        const user = await usuarios.deletar(nome);
        res.status(200).json({ msg: "Usuário excluido com sucesso" });
    } catch (e) {
        res.status(400).json({ msg: "Usuário não encontrado" });
    }
});


//Rota alterar dados pessoas
router.put('/users/:id', usuarioOuAdmin, async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    try {
        let user;
        if(id.endsWith(ADMIN)){
            user = await admins.buscarPorId(id);
        }else{
            user = await usuarios.buscarPorId(id);
        }

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        if(updates.nome && updates.nome.endsWith(ADMIN)){
            return res.status(400).json({ msg: "Não é permitido alterar um usuário para administrador" });
        }

        if(updates.nome){
            user.nome = updates.nome;
        }
        if(updates.senha){
            user.senha = updates.senha;
        }

        if(id.endsWith(ADMIN)){
            await admins.atualizar(id, user);
        }else{
            await usuarios.atualizar(id, user);
        }

        res.status(200).json({ msg: "Usuário atualizado com sucesso", user: user });
    } catch (e) {
        res.status(500).json({ msg: "Aconteceu um erro no servidor." });
    }
});

// Rota para buscar um ID
router.get("/buscar/:id", validaId, async(req, res) => {
    const id = req.params.id;

    try {
        let user = await usuarios.buscarPorId(id);
        if (!user) {
            user = await admins.buscarPorId(id);
        }

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ msg: "Erro ao buscar usuário" });
    }
});

module.exports = router;