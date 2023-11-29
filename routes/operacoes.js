const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const token = require("../helpers/middleware");
const {salvarPadaria, salvarProduto, atualizarPadaria, atualizarProduto, deletarPadaria, deletarProduto, buscarPadaria, buscarProduto, listarPadaria, listarProduto} = require("../model/Padaria");
const validar = require("../helpers/opValid");

//Rota principal - ROTA OK
router.get("/", (req, res) => {
    res.json({ msg: "Bem vindo a rota de operações" });
});

//Rota de listagem dos dados cadastrados - ROTA OK
router.get("/verTodos", async(req, res)=>{
    try{
        const padaria = await listarPadaria();
        const produto = await listarProduto();
        res.status(200).json({msg: "CADASTRADOS", padaria: padaria, produto: produto});
    }catch(e){
        res.status(500).json({msg: "Erro ao realizar a listagem"});
    }
})

//Rota para criar padaria - ROTA OK
router.post("/criarPadaria", token.isAuth, validar.dadosPadaria, async(req, res)=>{
    const nome = req.body;
    try{
        const padaria = await salvarPadaria(nome);
        res.status(201).json({msg: "Padaria criada com sucesso", padaria: padaria});
    }catch(e){
        res.status(500).json({msg: "Erro ao criar padaria!!!!"});
    }
})

//Rota para criar o produto que esta na padaria  - ROTA OK

router.post("/criarProduto", token.isAuth, validar.dadosProduto, async(req, res)=>{
    const  {nome, preco, padariaNome} = req.body;
    try{
        const produto = await salvarProduto(nome, preco, padariaNome);
        res.status(201).json({msg: "Produto criado com sucesso", produto: produto});
    }catch(e){
        res.status(500).json({msg:"Falha ao criar o produto, verifique novamente!!"});
    }
})

//Rota para a atualizar padaria - ROTA OK

router.put("/atualizarPadaria/:id", token.isAuth, validar.atualizarPadaria, async(req, res)=>{
    const nome = req.body.nome; //Por algum motivo, quando eu coloquei o .nome ele funcionou
    const id = req.params.id;
    try{
        const padaria = await atualizarPadaria(id, nome);
        console.log("Padaria ", padaria)
        res.status(200).json({msg: "Padaria atualizada com sucesso", padaria: padaria});
    }catch(e){  
        res.status(500).json({msg: "Ocorreu um erro"})
    }
});

//Rota para atualizar o produto - ROTA OK
router.put("/atualizarProduto/:id", token.isAuth, validar.atualizarProduto, async(req, res)=>{
    const id = req.params.id;
    const {nome, preco} = req.body;
    try{
        const produto = await atualizarProduto(id, nome, preco);
        res.status(200).json({msg: "Produto atualizado com sucesso", produto: produto});
    }catch(e){
        res.status(500).json({msg: "Ocorreu um erro"})
    }
});

module.exports = router;