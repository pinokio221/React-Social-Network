const jwt = require('jsonwebtoken');
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { registerValidation } = require('../validations/register_validation')
const { loginValidation } = require('../validations/login_validation')
const { verify } = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const uuid = require('uuid');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

const db = new JsonDB(new Config('chilltime-db', true, false, '/'));

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, email, login) => {
    return jwt.sign({
        userId: id,
        login, login,
        email: email,
        }, 'my secret', 
        {
            expiresIn: maxAge
        }, 
    );
}

const twoFactorVerify = (req, res) => {
    const {token, userId} = req.body;
    try {
        const path = `/user/${userId}`
        const user = db.getData(path);
        const { base32:secret } = user.temp_secret

        const verified = speakeasy.totp.verify({ secret, encoding: 'base32', token })

        if(verified) {
            db.push(path, { id: userId, secret: user.temp_secret })
            res.status(200).json({
                verified: true
            })
        } else {
            res.json({
                verified: false
            })
        }
    } catch(error) {
        res.status(400).send(error)
    }
}

const twoFactorValidate = (req, res) => {
    const {token, userId} = req.body;
    try {
        const path = `/user/${userId}`
        const user = db.getData(path);
        const { base32:secret } = user.secret

        const tokenValidates = speakeasy.totp.verify({ secret, encoding: 'base32', token })

        if(tokenValidates) {
            res.status(200).json({
                validated: true
            })
        } else {
            res.json({
                validated: false
            })
        }
    } catch(error) {
        res.status(400).send(error)
    }
}

const signUp = (req, res) => {
    const { error } = registerValidation(req.body);
    const id = uuid.v4();
    if(error) { return res.status(400).json(error.details[0].message) }
    
    User.query().select('id', 'password', 'email', 'login')
    .where('email', req.body.email)
    .orWhere('login', req.body.login)
    .first().then(async function(result){
        if(result){
            return res.status(400).json({
                message: "User with same email or login already exists"
            })
        }
        const { firstname, lastname, fullname, login, email, gender, birthday, age, password } = req.body;
        
        //HASH THE PASSWORD 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        try {
            User.query().insert({
                first_name: firstname,
                last_name: lastname,
                fullname: fullname,
                login: login,
                email: email,
                gender: gender,
                birthday: birthday,
                age: age,
                password: hashedPassword,
            })
            .then(function(result){
                try { // 2FA
                    const path = `/user/${id}`;
                    const temp_secret = speakeasy.generateSecret();
                    qrcode.toDataURL(temp_secret.otpauth_url, function(err, data) {
                        db.push(path, { id, temp_secret });
                        console.log(data)
                    })
                } catch(err) {
                    res.status(400).send('err')
                }
                res.status(201).json ({
                    message: "You are succesfully registered",
                })
            })
            
        } catch(err) {
            res.status(400).send(err)
        }
        })
        
}
    
const signIn = (req, res) => {
    const { error } = loginValidation(req.body);
    if(error) { return res.status(401).json({
        "message": error.details[0].message
    }) }

    let isAuth = req.cookies.jwt;

    if(!isAuth) {
        User.query().select('id', 'login', 'password', 'email')
        .where('login', req.body.login)
        .orWhere('email', req.body.login)
        .first().then(async function(user){
            if(!user) {
                res.status(401).json({
                    message: "Wrong login or password. Please try again",
                })
            }
            else {
                bcrypt.compare(req.body.password, user.password, function(err, result){
                    if(result){
                        let token = createToken(user.id, user.email, user.login);
                        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                        res.status(200).json({
                            message: "You are succesfully logged in!",
                            token: token,
                        })
                        
                    }
                    else {  
                        res.status(401).json({
                            message: "Wrong login or password. Please try again",
                        })
                    }
                })
            }
        }).catch(error => {
            res.status(500).json({
                message: "Something went wrong. Please try again.",
            })
        })
    } else {
        res.status(405).json({
            message: "You are already logged in"
        })
    }

    
}

const signOut = (req, res) => {
    let isAuth = req.cookies.jwt;

    if(isAuth) {
        res.cookie('jwt', '', {maxAge: 1});
        res.status(200).json({
        message: "You are succesfully logging out. Bye."
    })
    } else {
        res.status(401).json({
            message: "You have not been logged in."
        })
    }
    
}

const checkCurrentUser = (req, res, next) => {
    let token = req.cookies.jwt;
    if(token){
        verify(token, 'my secret', (err, decoded) => {
            if(err) {
                res.status(401).json({
                    message: "You are not authorized",
                })
                res.locals.user = null;
                next();
            } else {
                User.query().select('id', 'login', 'email')
                .where('id', decoded.userId)
                .first().then(function(user){
                    res.status(200).json({
                        message: "You are authorized user",
                        user: {
                            id: user.id,
                            email: user.email,
                            login: user.login,
                        }
                    })
                    res.locals.user = user;
                })
            }
        })
    }
    else {
        res.locals.user = null;
        res.status(401).json({
            message: "You are not authorized."
        })
        next();
    }
}


module.exports = {
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
    twoFactorVerify: twoFactorVerify,
    twoFactorValidate: twoFactorValidate,
    checkCurrentUser: checkCurrentUser
}


