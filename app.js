const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyparser = require("body-parser");

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

app.use(morgan('dev')); //precisa inserir antes de iniciar as rotas, para ele poder carregar o log delas.
app.use(bodyparser.urlencoded({extended: false})); //apenas dados simples
app.use(bodyparser.json()); //json de entrada no body

app.use((req,res,next)=> {
    res.header(
        'Acess-Control-Allow-Origin', //a permissão de acesso será dada para todos os servidores. caso um específico, substituir o asterisco pelo seu nome.
        '*'
    );
    res.header(
        'Acess-Control-Allow-Header', //quais propriedades de cabeçalho que iremos aceitar
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'

    );

    if(req.method=='OPTIONS'){ //o OPTIONS serve para dizer ao servidor que opções são aceitas na chamada da API.
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
})

//definindo as rotas
app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

//tratamento de erro 404
app.use((req,res,next) => {
    const erro = new Error ("Não encontrado!");
    erro.status = 404;
    next(erro);
});

//tratamento de erro 500
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})


module.exports = app;