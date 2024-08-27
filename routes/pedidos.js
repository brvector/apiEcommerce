const express = require('express');
const router = express.Router();


//RETORNA OS PEDIDOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando GET dentro da rota de pedidos'
    });
});

//CRIA UM PEDIDO
router.post('/', (req, res, next) =>{

    const  pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    };

    res.status(201).send({
        mensagem: 'Pedido criado',
        pedidoCriado: pedido
    })
})

router.delete('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Usando DELETE dentro da rota de pedidos'
    })
})

router.put('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Usando PUT dentro da rota de pedidos'
    })
})

router.patch('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Usando PATCH dentro da rota de pedidos'
    })
})




module.exports = router;