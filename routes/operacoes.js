const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const token = require("../helpers/middleware");
const { salvarPadaria, salvarProduto, atualizarPadaria, atualizarProduto, deletarPadaria, deletarProduto, listarPadaria, listarProduto, buscarpID, buscarID, padariaModel, produtoModel, paginarProduto, paginarPadaria } = require("../model/Padaria");
const validar = require("../helpers/opValid");

//Rota principal 
router.get("/", (req, res) => {
  res.json({ msg: "Bem vindo a rota de operações" });
});

//Rota de listagem dos dados cadastrados
router.get("/verTodos", async (req, res) => {
  try {
    const padaria = await listarPadaria();
    const produto = await listarProduto();
    res.status(200).json({ msg: "CADASTRADOS", padaria: padaria, produto: produto });
  } catch (e) {
    res.status(500).json({ msg: "Erro ao realizar a listagem" });
  }
});

//Rota para criar padaria 
router.post("/criarPadaria", token.isAuth, validar.dadosPadaria, async (req, res) => {
    const nome = req.body;
    try {
        const padaria = await salvarPadaria(nome);
        res.status(201).json({ msg: "Padaria criada com sucesso", padaria: padaria });
    } catch (e) {
        res.status(500).json({ msg: "Erro ao criar padaria!!!!" });
    }
});

//Rota para criar o produto que esta na padaria 

router.post("/criarProduto", token.isAuth, validar.dadosProduto, async (req, res) => {
    const { nome, preco, padariaNome } = req.body;
    try {
      const produto = await salvarProduto(nome, preco, padariaNome);
      res.status(201).json({ msg: "Produto criado com sucesso", produto: produto });
    } catch (e) {
      res.status(500).json({ msg: "Falha ao criar o produto, verifique novamente!!" });
    }
});

//Rota para buscar uma padaria 
router.get("/buscarPadaria/:id", token.isAuth, validar.validaID, async (req, res) => {
    const id = req.params.id;
    try {
      const padaria = await buscarID(id);
      res.status(200).json({ msg: "Padaria encontrada", padaria: padaria });
    } catch (e) {
      res.status(500).json({ msg: "Ocorreu um erro" });
    }
  }
);

//Rota para buscar um produto
router.get("/buscarProduto/:id", token.isAuth, validar.validaID, async (req, res) => {
    const id = req.params.id;
    try {
      const produto = await buscarpID(id);
      console.log("Produto ", produto);
      res.status(200).json({ msg: "Produto encontrado", produto: produto });
    } catch (e) {
      res.status(500).json({ msg: "Ocorreu um erro" });
    }
  }
);

//Rota para a atualizar padaria
router.put("/atualizarPadaria/:id", token.isAuth, validar.atualizarPadaria, async (req, res) => {
    const nome = req.body.nome;
    const id = req.params.id;
    try {
      const padaria = await atualizarPadaria(id, nome);
      res.status(200).json({ msg: "Padaria atualizada com sucesso", padaria: padaria });
    } catch (e) {
      res.status(500).json({ msg: "Ocorreu um erro" });
    }
  }
);

//Rota para atualizar o produto 
router.put("/atualizarProduto/:id", token.isAuth, validar.atualizarProduto, async (req, res) => {
    const id = req.params.id;
    const { nome, preco } = req.body;
    try {
      const produto = await atualizarProduto(id, nome, preco);
      res.status(200).json({ msg: "Produto atualizado com sucesso", produto: produto });
    } catch (e) {
      res.status(500).json({ msg: "Ocorreu um erro" });
    }
  }
);

//Rota para deleter uma padaria 
router.delete("/deletarPadaria/:id", token.isAuth, validar.validaID, async (req, res) => {
    const id = req.params.id;
    try {
      const padaria = await deletarPadaria(id);
      res.status(200).json({ msg: "Padaria excluida com sucesso", padaria: padaria });
    } catch (e) {
      res.status(500).json({ msg: "Ocorreu um erro!!!" });
    }
  }
);

//Rota para deletar um produto
router.delete("/deletarProduto/:id", token.isAuth, validar.validaID, async (req, res) => {
    const id = req.params.id;
    try {
      const produto = await deletarProduto(id);
      res.status(200).json({ msg: "Produto excluido com sucesso", produto: produto });
    } catch (e) {
      res.status(500).json({ msg: "Ocorreu um erro!!!" });
    }
  }
);

//Rota lógica de negócios
router.get("/produtoCaro/:preco", async (req, res) => {
  try {
    const preco = parseInt(req.params.preco);
    const produtosCaros = await produtoModel.find({ preco: { $gt: preco } });
    const padariaIds = produtosCaros.map((produto) => produto.owner);
    const padarias = await padariaModel.find({ _id: { $in: padariaIds } });
    
    res.status(200).json({ msg: "Padarias com produto caro", padarias: padarias });
  } catch (e) {
    res.status(500).json({ msg: "Ocorreu um erro" });
  }
});

// Rota de listagem de padarias paginada
router.get("/listarPadarias", async(req, res) => {
  try {
    const limite = parseInt(req.query.limite) || 5;
    const pagina = parseInt(req.query.pagina) || 1;

    const contador = (pagina - 1) * limite;
    const padarias = await paginarPadaria(limite, contador);

    res.status(200).json({ msg: "Listar Padarias com paginação", padaria : padarias });
  } catch(e) {
    res.status(500).json({ msg: "Erro ao listar Padarias!" });
  }
});

// Rota de Listagem de produtos paginada
router.get("/listarProdutos", async(req, res) => {

  try {
    const limite = parseInt(req.query.limite) || 5;  
    const pagina = parseInt(req.query.pagina) || 1; 

    const contador = (pagina - 1) * limite;
    const produtos = await paginarProduto(limite, contador);

    res.status(200).json({ msg: "Listar Produtos com paginação", produto: produtos });
  } catch (e) {
    res.status(500).json({ msg: "Erro ao listar Produtos!" });
  }
});

module.exports = router;
