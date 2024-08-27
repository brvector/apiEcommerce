const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error,conn) => {
   
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Produto;',
            (error, resultado, fields) => {
                if (error) { 
                    res.status(500).send({ error: error }) 
                }
                return res.status(200).send({response: resultado})
            }
        )
    })    

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
                    
                    return res.status(500).send({error: error,});
                }

                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso!',
                    idProduto: resultado.insertId
                });
            }
        )
    });

    
})

//DELETAR UM PRODUTO
router.delete('/', (req, res, next) =>{
    
    mysql.getConnection((error, conn) =>{
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(                                     
            //com isto, eu passo pro sql os parâmetros que eu digitar
            'DELETE FROM Produto WHERE idProduto = ?', [req.body.idProduto], 
            
            (error, resultado, field)=>{
                conn.release(); //MUITO IMPORTANTE!! Jamais deixar de escrever isto. A conexão precisa ser liberada após o callback, pois o pool de conexões tem um limite. se não der release, a api vai travar!
                if (error){
                    
                    return res.status(500).send({error: error,});
                }

                res.status(202).send({
                    mensagem: 'Produto excluído com sucesso!',
                    response: resultado
                    
                });
            }
        )
    });
})

router.put('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Usando PUT dentro da rota de produtos'
    })
})

//ALTERAR UM PRODUTO
router.patch('/', (req, res, next) =>{
    
    mysql.getConnection((error, conn) => {
        if(error){console.error(error); res.status(500).send({error: error})}
        conn.query( //pra quebrar linha no SQL, só substituir aspas simples por crases!
            'UPDATE Produto SET nome = ?, preco = ? WHERE idProduto = ?', [req.body.nome, req.body.preco, req.body.idProduto], //tem que estar na mesma ordem! 
            (error, resultado, field)=>{
                conn.release();
                if (error){
                    console.error(error)
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(202).send({
                    mensagem: 'Produto alterado com sucesso!',
                    response: resultado
                    
                });
            }
        )
    })

})




module.exports = router;
