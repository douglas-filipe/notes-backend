const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const User = require('./routes/user')
const Note = require("./routes/notes")

dotenv.config()

require('./config/database')

const server = express()

server.use(cors())
server.use(express.json())

server.use("/user", User)
server.use("/note", Note)


server.listen('4000', ()=>{
    console.log('App running')
})