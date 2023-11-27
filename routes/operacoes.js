const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {salvarPadaria, salvarProduto, atualizarPadaria, atualizarProduto, deletarPadaria, deletarProduto, buscarPadaria, buscarProduto, listarPadaria, listarProduto} = require("../model/Padaria");

router.get("/", (req, res) => {
    res.json({ msg: "Bem vindo a rota de operações" });
});


module.exports = router;