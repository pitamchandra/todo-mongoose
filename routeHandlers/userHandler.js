const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const userSchema = require('../Schemas/userSchema')
const User = new mongoose.model('user', userSchema)

router.post('/signup', async (req, res) => {
    try {
        const {name, username, password,email, phone} = req.body
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name, username, password: hashPassword, email, phone
        })
        await newUser.save()
        res.status(201).json({
            status: "success",
            message: "user created successfully",
            data: newUser
        })
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.find({username : req.body.username})
        if(user && user.length > 0){
            const isValidUser = await bcrypt.compare(req.body.password, user[0].password);
            if (isValidUser) {
                const token = jwt.sign({
                        username: user[0].username,
                        userId: user[0]._id
                    }, process.env.jwt_SECRET, {
                        expiresIn: '1h'
                    })
                    res.status(200).json({
                        status: "success",
                        access: token,
                        message: "login successful"
                    })
            } else {
                res.status(401).json({
                    status: "error",
                    message: "Authentication Failed"
                })
            }
        }else{
            res.status(401).json({
                status: "error",
                message: "Authentication Failed"
            })
        }
    } catch {
        res.status(401).json({
            status: "failed",
            message: "Authentication Failed"
        })
    }
})

router.get('/all', async (req, res) => {
    try {
        const allUsers = await User.find({}).populate('todos')
        res.status(200).json({
            status: "success",
            message: "user fetching successfully",
            data: allUsers
        })
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})

module.exports = router;