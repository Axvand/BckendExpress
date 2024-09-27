import express, { application } from 'express';
import router from './routes.js';
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())


const port =  3000;

app.use('/', router)

app.listen(3000, () =>{
    console.log(`O aplicativo ta cuns caralho na porta:${port}`)
})