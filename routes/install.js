const express = require("express");
const router = express.Router();
const { padariaModel, produtoModel } = require("../model/Padaria");

router.get("/", async (req, res) => {
    try {
        const padaria1 = await padariaModel.create({nome: "Padaria do João"});
        const padaria2 = await padariaModel.create({nome: "Padaria da Maria"});
        const padaria3 = await padariaModel.create({nome: "Padaria do Pedro"});
        const padaria4 = await padariaModel.create({nome: "Padaria da Ana"});
        const padaria5 = await padariaModel.create({nome: "Padaria do Carlos"});
        
        await produtoModel.create({nome: "Produto 1", preco: 10, owner: padaria1._id});
        await produtoModel.create({nome: "Produto 2", preco: 20, owner: padaria2._id});
        await produtoModel.create({nome: "Produto 3", preco: 30, owner: padaria3._id});
        await produtoModel.create({nome: "Produto 4", preco: 40, owner: padaria4._id});
        await produtoModel.create({nome: "Produto 5", preco: 50, owner: padaria5._id});
        
        res.status(200).json({
            msg: "Banco de dados instalado com sucesso"
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({msg: "Ocorreu um erro ao instalar o banco de dados"});
    }
});

module.exports = router;