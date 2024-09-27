import express from 'express'
import router from './routes.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const port = 3000



app.use('/', router)

app.listen(port ,()=>{
    console.log('Running... Port:'+ port)
})