const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const User = require('./routes/user')
const Note = require("./routes/notes")
const mongoose = require("mongoose")

const server = express()

dotenv.config()

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("DB running")
    }).catch((e) => {
        console.log(e)
    })

server.use(cors())
server.use(express.json())
server.get("/", (req, res) => {
    res.send("Funcionou")
})

server.use("/user", User)
server.use("/notes", Note)


server.listen(process.env.PORT || 3000)

