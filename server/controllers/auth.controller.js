const jwt = require('jsonwebtoken');
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { registerValidation } = require('../validations/register_validation')
const { loginValidation } = require('../validations/login_validation')

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, email) => {
    return jwt.sign({
        email: email,
        userId: id 
        }, 'my secret', 
        {
            expiresIn: maxAge
        }, 
    );
}

const signUp = (req, res) => {
    const { error } = registerValidation(req.body);
    if(error) { return res.status(400).send(error.details[0].message) }

    User.query().select('id', 'password', 'email', 'login')
    .where('email', req.body.email)
    .orWhere('login', req.body.login)
    .first().then(async function(result){
        if(result){
            return res.status(400).send("User with same email or login already exists.")
        }
        const { login, email, password } = req.body;
    
        //HASH THE PASSWORD 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log(hashedPassword)

        try {
            User.query().insert({
                login: login,
                email: email,
                password: hashedPassword,
            })
            .then(function(result){
                res.json ({
                    message: "You are succesfully registered",
                    resultCode: 0
                })
            })
            
        } catch(err) {
            res.status(400).send(err)
        }
        })
}

    
    
const signIn = (req, res) => {
    const { error } = loginValidation(req.body);
    if(error) { return res.status(400).send(error.details[0].message) }

    User.query().select('id', 'login', 'password', 'email')
    .where('login', req.body.login)
    .orWhere('email', req.body.login)
    .first().then(async function(user){
       console.log(user)
        if(!user) {
            res.status(401).json({
                message: "Login not found. Access denied",
            })
        }
        else {
            bcrypt.compare(req.body.password, user.password, function(err, result){
                console.log(result)
                if(result){
                    let token = createToken(user.id, user.email);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    res.status(200).json({
                        message: "You are succesfully logged in!",
                        token: token,
                    })
                    
                }
                else {  
                    res.status(401).json({
                        message: "Wrong password. Access denied",
                    })
                }
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong. Please try again.",
        })
    })
}


module.exports = {
    signUp: signUp,
    signIn: signIn,
}


