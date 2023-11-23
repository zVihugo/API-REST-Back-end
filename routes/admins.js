const express = require('express');
const router = express.Router();

const Admin = require('../model/Admin');
const { model } = require('mongoose');

// Rota pública
router.get("/admin", (req, res) => {
    res.json({msg: "Rota para administradores"});
});

// Rota privada
router.get('/admin/:id', async (req, res) => {
    const id = req.params.id;

    const admin = await Admin.getById(id);
    if(!admin) {
        return res.status(404).json({ msg: "Admin não encontrado!" });
    }
    res.status(200).json({ admin });
});

// Fazer middeware para a verificação do bear token

router.post('/', async (req, res) => {

    const {nome, email, senha} = req.body;

    if(!nome) {
        res.status(422).json({ error: "O nome é obrigatório!" });
        return;
    }
    if(!email) {
        res.status(422).json({ error: "O email é obrigatório!" });
        return;
    }
    if(!senha) {
        res.status(422).json({ msg: "A senha é obrigatório!" });
        return;
    }

    try {
        Admin.save(nome, email, senha);
        res.status(200).json({ msg: "Admin inserido com sucesso!" });
    }
    catch(e) {
        res.status(500).json({ msg: "Falha ao salvar Admin."});
    }
});

module.exports = router;