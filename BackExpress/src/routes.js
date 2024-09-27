import { Router } from 'express';
import { GetAll, GetOne, PostOne, DeleteOne, PutOne } from './controller.js';

import  mysql2  from 'mysql2';
const router = Router()
const mysql = mysql2

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mensager'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados!');
});

router.get('/mensagem',(req, res)=> GetAll(connection, req, res))
router.get('/mensagem/:id',(req, res)=>GetOne(connection, req, res))
router.post('/mensagem',(req, res)=>PostOne(connection, req, res))
router.put('/mensagem/:id',(req, res)=>PutOne(connection, req, res))
router.delete('/mensagem/:id',(req, res)=>DeleteOne(connection, req, res))
// router.put('/:id',(req, res)=>{})


export default router