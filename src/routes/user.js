const express = require("express")
const router = express()
const User = require('../models/User')
const CriptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//Register User

router.post("/register", async(req, res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    try{
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }catch(e){
        res.status(500).json(e)
    }
})

//Login

router.post("/login", async(req, res)=>{
    try{
        const user = await User.findOne({
            email: req.body.email
        })

        !user && res.status(401).json('Wrong credential')

        const hashedPassowrd = CriptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        )

        const OriginalPassword = hashedPassowrd.toString(CryptoJS.enc.Utf8)

        OriginalPassword !== body.password && res.status(401).json('Wrong credentials!')

        const accessToken = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SEC,
            {expiresIn: "3d"}
        )

        const {password, ...others} = user._doc
        res.status(200).json(others)

    }catch(e){
        res.status(500).json(e)
    }
})

module.exports = router