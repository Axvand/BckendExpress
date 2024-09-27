import validator from "validator";

export const GetAll = (connection, req, res) =>{
    const comandSQLGetAll = "SELECT * FROM `chat`"
    connection.query(comandSQLGetAll,(err, result)=>{
        if(err){
            res.status(500).send('Problema na conexão')
            console.log(err.message)
        }
        res.status(200).send(result)
    }) 
}
export const GetOne =(connection, req, res) =>{
    const id = parseInt(req.params.id);
    const comandSQLGetOne = "SELECT FROM `chat` WHERE id_mensagem = ?"
    connection.query(comandSQLGetOne,[id],(err, result)=>{
        if(err){
            res.status(500).send('Problema na conexão')
        }
        res.status(200).send(result)
    })
}

export const PostOne =(connection, req, res) =>{
    const {mensagem, data, nome} = req.body;

    if(!mensagem|| typeof mensagem !== "string"||
        !data|| typeof data !== "string"||
        !nome|| typeof nome !== "string"){
        res.send('Dados Inseridos invalidos')
    }
    const mensagemSanit = validator.escape(mensagem)
    const dataSanit = validator.escape(data)
    const nomeSanit = validator.escape(nome)
    const comandSQLPostOne = "INSERT INTO `chat`(`mensagem`, `data`, `nome`) VALUES (?,?,?)"
    connection.query(comandSQLPostOne,[mensagemSanit, dataSanit,nomeSanit],(err, result)=>{
        if(err){
            res.status(500).send('Erro na requisição')

        }
        res.status(200).send(result)
    })

}
export const PutOne =(connection, req, res) =>{
    const id = parseInt(req.params.id)
    const {mensagem, data, nome} = req.body;

    if(!mensagem|| typeof mensagem !== "string"||
        !data|| typeof data !== "string"||
        !nome|| typeof nome !== "string"){ 
        res.send('Dados inseridos invalidos')
    }
    const mensagemSanit = validator.escape(mensagem)
    const dataSanit = validator.escape(data)
    const nomeSanit = validator.escape(nome)
    const comandSQLUpdateOne = "UPDATE `chat` SET mensagem = ?, data = ? , nome= ? WHERE id_mensagem = ?"
    connection.query(comandSQLUpdateOne,[mensagemSanit, dataSanit, nomeSanit, id],(err, result)=>{
        if(err){

            res.status(500).send('problemas no update'+ err.message)
        }
        res.status(200).send(result);
    })
    
}
export const DeleteOne =(connection, req, res) =>{
    const id = parseInt(req.params.id);
    const comandSQLDelete = "DELETE FROM `chat` WHERE id_mensagem = ?"
    connection.query(comandSQLDelete,[id],(err, result)=>{
        if(err){
            res.status(500).send('falaha ao deletar')
        }
        return res.status(200).send('')

    })
}