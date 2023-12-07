const express = require("express");
const router = express.Router();
const { padariaModel, produtoModel } = require("../model/Padaria");
const { adminModel } = require('../model/Admin');

router.get("/", async (req, res) => {
    try {

        await adminModel.create({nome: "padrao@admin", senha: "banana"});

        const padaria1 = await padariaModel.create({nome: "Padaria do João"});
        const padaria2 = await padariaModel.create({nome: "Padaria da Maria"});
        const padaria3 = await padariaModel.create({nome: "Padaria do Pedro"});
        const padaria4 = await padariaModel.create({nome: "Padaria da Ana"});
        const padaria5 = await padariaModel.create({nome: "Padaria do Carlos"});
        const padaria6 = await padariaModel.create({nome: "Padaria da Laura"});
        const padaria7 = await padariaModel.create({nome: "Padaria do Miguel"});
        const padaria8 = await padariaModel.create({nome: "Padaria da Sofia"});
        const padaria9 = await padariaModel.create({nome: "Padaria do Lucas"});
        const padaria10 = await padariaModel.create({nome: "Padaria da Julia"});
        const padaria11 = await padariaModel.create({nome: "Padaria do Guilherme"});
        const padaria12 = await padariaModel.create({nome: "Padaria da Larissa"});
        const padaria13 = await padariaModel.create({nome: "Padaria do Gabriel"});
        const padaria14 = await padariaModel.create({nome: "Padaria da Beatriz"});
        const padaria15 = await padariaModel.create({nome: "Padaria do Rafael"});
        
        await produtoModel.create({nome: "Produto 1", preco: 10, owner: padaria1._id});
        await produtoModel.create({nome: "Produto 2", preco: 20, owner: padaria2._id});
        await produtoModel.create({nome: "Produto 3", preco: 30, owner: padaria3._id});
        await produtoModel.create({nome: "Produto 4", preco: 40, owner: padaria4._id});
        await produtoModel.create({nome: "Produto 5", preco: 50, owner: padaria5._id});
        await produtoModel.create({nome: "Produto 6", preco: 15, owner: padaria6._id});
        await produtoModel.create({nome: "Produto 7", preco: 26, owner: padaria7._id});
        await produtoModel.create({nome: "Produto 8", preco: 5, owner: padaria8._id});
        await produtoModel.create({nome: "Produto 9", preco: 3, owner: padaria9._id});
        await produtoModel.create({nome: "Produto 10", preco: 30, owner: padaria10._id});
        await produtoModel.create({nome: "Produto 11", preco: 14, owner: padaria11._id});
        await produtoModel.create({nome: "Produto 12", preco: 12, owner: padaria12._id});
        await produtoModel.create({nome: "Produto 13", preco: 10, owner: padaria13._id});
        await produtoModel.create({nome: "Produto 14", preco: 13, owner: padaria14._id});
        await produtoModel.create({nome: "Produto 15", preco: 16, owner: padaria15._id});
        
        res.status(200).json({
            msg: "Banco de dados instalado com sucesso"
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({msg: "Ocorreu um erro ao instalar o banco de dados"});
    }
});

module.exports = router;