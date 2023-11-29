const padariaModel = require("../model/Padaria");

async function dadosPadaria(req, res, next){
    const {nome} = req.body;
    console.log("nome", nome)
    if(nome){
        const padaria = await padariaModel.buscarPadaria(nome);
        if(padaria){
            res.status(400).json({msg: "Padaria já cadastrada"});
            return;
        }
    }else if(!nome){
        res.status(400).json({msg: "Padaria não informada"});
        return;
    }
    next();
}

async function dadosProduto(req, res, next){
    const {nome, preco, padariaNome} = req.body;
    
    if(nome && preco && padariaNome){
        const padaria = await padariaModel.buscarPadaria(padariaNome);
        if(padaria){
            const produto = await padariaModel.buscarProdutoNaPadaria(nome, padaria._id);
            if(produto){
                res.status(400).json({msg: "Produto já cadastrado nesta padaria"});
                return;
            } 
        }else{
            res.status(400).json({msg: "Padaria não encontrada"});
            return;
        }
    }else{
        res.status(400).json({msg: "Por favor, verifique novamente os dados inseridos"});
        return;
    }
    next();
}
async function atualizarPadaria(req, res, next){
    const nome = req.body.nome;
    const id = req.params.id;

    if(nome && id){
        const padaria = await padariaModel.buscarID(id);
        if(padaria){
            next();
        }else{
            res.status(400).json({msg: "Padaria não encontrada"});
            return 
        }
    }else{
        res.status(400).json({msg: "Por favor, verifique novamente os dados inseridos"});
        return;
    }
}

async function atualizarProduto(req, res, next){
    const {nome, preco} = req.body
    const id = req.params.id;
    if(nome && preco && id){
        const produto = await padariaModel.buscarpID(id);
        if(produto){
            next();
        }else{
            res.status(400).json({msg: "Produto não encontrado"});
            return;
        }
    }else{
        res.status(400).json({msg: "Por favor, verifique novamente os dados inseridos"});
        return;
    }
}
module.exports = {
    dadosPadaria,
    dadosProduto,
    atualizarPadaria,
    atualizarProduto
}