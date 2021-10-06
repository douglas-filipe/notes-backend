const Notes = require("../models/Notes")

const verifyToken = require("../middlewares/verifyToken")

const router = require('express').Router()

router.post("/", verifyToken, async(req, res)=>{
    const newNote = new Notes(req.body)

    try{
        const saveNote = await newNote.save()
        res.status(200).json(saveNote)
    }catch(e){
        res.status(500).json(e)
    }
})

module.exports = router