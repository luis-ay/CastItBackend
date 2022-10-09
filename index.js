import express from 'express'
import bodyParser from 'body-parser'
import mongoose, { mongo } from 'mongoose'
import cors from 'cors'
import pollRoutes from './routes/polls.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/', pollRoutes)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(5000,'192.168.1.20', ()=> 
    {console.log(`Server Running on ${PORT}`)
    console.log(mongoose.connection.readyState)}
    ))
    .catch((error) => console.log(error.message))
