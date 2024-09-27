import { Router } from "express";
import mysql2 from 'mysql2'
import { GetAll, GetOne, PostOne,PutOne, DeleteOne } from "./controller.js";

const mysql = mysql2
const router = Router()

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mensager"
})

connection.connect((err)=>{
    if(err){
        console.error('Conexão falhou')
        return;
    }
    console.log('On!')
})


router.get('/mensagem',(req,res)=> GetAll(connection, req, res))
router.get('/mensagem/:id',(req,res)=> GetOne(connection, req, res))
router.post('/mensagem',(req,res)=> PostOne(connection, req, res))
router.put('/mensagem/:id',(req,res)=> PutOne(connection, req, res))
router.delete('/mensagem/:id',(req,res)=> DeleteOne(connection, req, res))

export default router