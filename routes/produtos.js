const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    
    if (error) { console.error(error); res.status(500).send({ error: error }) }
    conn.query(
        'SELECT * FROM PRODUTO;',
        (error, resultado, fields) => {
            if (error) { console.error(error); res.status(500).send({ error: error }) }
            return res.status(200).send({response: resultado})
        }
    )

});

//INSERE PRODUTO
router.post('/', (req, res, next) =>{

    //criando objeto do tipo Produto
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco,
    };


    //Fazendo a conexão com o banco de dados Cannot read properties of undefined reading getConnection
        mysql.getConnection((error, conn) =>{
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO Produto (nome, preco) VALUES (?,?);',
            [req.body.nome, req.body.preco], //com isto, eu passo pro sql os parâmetros que eu digitar
            (error, resultado, field)=>{
                conn.release(); //MUITO IMPORTANTE!! Jamais deixar de escrever isto. A conexão precisa ser liberada após o callback, pois o pool de conexões tem um limite. se não der release, a api vai travar!
                if (error){
                    console.error(error)
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso!',
                    id_produto: resultado.insertId
                });
            }
        )
    });

    
})

router.delete('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Usando DELETE dentro da rota de produtos'
    })
})

router.put('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Usando PUT dentro da rota de produtos'
    })
})

router.patch('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Usando PATCH dentro da rota de produtos'
    })
})




module.exports = router;
