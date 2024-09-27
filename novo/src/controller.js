import validator from 'validator';

export const GetAll = (connection, req, res) =>{
    const comandoSQL = "SELECT * FROM `chat`"
    connection.query(comandoSQL,(err, result)=>{
        if(err){
            res.status(500).send('erro na conexão com o banco'+ err.message);
        }
        res.status(200).send(result);
    })
}

export const GetOne = (connection, req, res) => {
    const id = parseInt(req.params.id);
    const comandoSQL = `SELECT * FROM chat WHERE id_mensagem = ${id}`
    connection.query(comandoSQL, (err, result)=>{
        if(err){
            res.status(500).send('Erro na conexão com o banco'+ err.message);
        }
        res.status(200).send(result);
    })
}




export const PostOne = (connection, req, res) =>{
    const { mensagem, data, nome} = req.body;
    const comandoSQL = "INSERT INTO `chat`( `mensagem`, `data`, `nome`) VALUES (?,?,?)"

    const mensagemSanitizado=validator.escape(mensagem)
    const dataSanitizado= validator.escape(data)
    const nomeSanitizado= validator.escape(nome)
    
    connection.query(comandoSQL,[mensagemSanitizado, dataSanitizado, nomeSanitizado],(err, result)=>{
        if(err){
            return res.status(500).send('Erro na requisição com o banco:'+ err.message)
        }  
        return res.status(200).send(result)
    })
}

export const PutOne  = (connection, req, res) =>{
    const id = parseInt(req.params.id)
    const {mensagem, data, nome, } = req.body

    if(!mensagem || typeof mensagem !== 'string'|| !data || typeof data !== 'string' || !nome || typeof nome !== 'string' ){
        res.status(400).send('Dados invalidos!')
    }
    const mensagemSanizada = validator.escape(mensagem)
    const dataSanizada = validator.escape(data)
    const nomeSanizada = validator.escape(nome)


    const comandoSQL = "UPDATE chat SET mensagem = ? , data = ? , nome = ?  WHERE  id_mensagem = ?"


    connection.query(comandoSQL,[mensagemSanizada, dataSanizada, nomeSanizada, id],(err, result )=>{
        if(err){
            res.status(500).send('Algo deu errado na requisição')
            console.error(err.message)
        }
        res.status(200).send(result)
    })
}

export const DeleteOne = (connection, req, res) =>{
    const id = parseInt(req.params.id)
    const comandoSQL = `DELETE  FROM chat WHERE id_mensagem = ${id}`
    connection.query(comandoSQL,(err, result)=>{
        if(err){
            return res.status(500).send('Erro na requisição com o banco:'+ err.message)
        }  
        return res.status(200).send(result)
    })
    
}