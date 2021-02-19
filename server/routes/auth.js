const express = require('express');
const router = express.Router();
const User = require('../model/User')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../validation') 

router.post('/register', async (req, res) => {

    //VALIDATE DATA BEFOME MAKING USER
    const { error } = registerValidation(req.body);
    if(error) { return res.status(400).send(error.details[0].message) }

    //CHEKING IF THE USER IS ALREADY IN DB
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send("Email already exists!")

    
    // CREATE A NEW USER 
    const { name, email, password } = req.body;
    
     //HASH THE PASSWORD 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const savedUser = await User.create({
            name,
            email,
            password: hashedPassword
        })
        res.send(savedUser);
        
    }catch(err) {
        res.status(400).send(err)
    }
});



router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if(error) { return res.status(400).send(error.details[0].message) }

    const user = await User.findOne({email: req.body.email})
    if(!user) {
        res.json({
            message: "Email not found. Access denied",
            resultCode: 400
        })
    }

    //PASSWORD IS CORRECT
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) {
        res.json({
            message: "Wrong password. Access denied",
            resultCode: 400
        })
    }

    res.json({
        message: "You are succesfully logged in!",
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        resultCode: 0
    })


    


})

module.exports = router;


