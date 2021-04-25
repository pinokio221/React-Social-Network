const jwt = require('jsonwebtoken');
const User = require('../models/User')
const Setting = require('../models/Setting');
const bcrypt = require('bcryptjs')
const { registerValidation } = require('../validations/register_validation')
const { loginValidation } = require('../validations/login_validation')
const { verify } = require('jsonwebtoken');
const uuid = require('uuid');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');
const speakeasy = require('speakeasy');
const tfaController = require('./tfa_controller'); 

const db = new JsonDB(new Config('./db/chilltime-db', true, false, '/'));

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

const signUp = (req, res) => {
    const { error } = registerValidation(req.body);
    const id = uuid.v4();
    if(error) { return res.status(400).json({
        "message": error.details[0].message
    }) }
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
            const path = `/user/${id}`;
            const temp_secret = speakeasy.generateSecret();
            
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
                auth_id: id
            })
            .then(async function(result){
                Setting.query().insert({
                    userId: result.id,
                    tfa: false,
                    tfa_verified: false
                }).then(() => {
                    db.push(path, { id, temp_secret });
                    res.status(201).json ({
                        message: "You are succesfully registered",
                    })
                })
            })
            
        } catch(err) {
            console.log(error)
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
                bcrypt.compare(req.body.password, user.password, async function(err, result){
                    if(result){
                        let tfaSetting = await tfaController.twoFactorAuthSetting(req, res, user.id);
                        const authId = await User.query().select('auth_id').where('id', user.id).first();
                        if(!tfaSetting.verified) {
                            return res.status(200).json({
                                verified: tfaSetting.verified,
                                twoFactorAuthSetting: tfaSetting.twoFactorAuthStatus,
                                authId: authId.auth_id,
                                message: "Your account not verified",
                            })
                        }
                        if(tfaSetting.twoFactorAuthStatus) {
                            res.status(200).json({
                                verified: tfaSetting.verified,
                                twoFactorAuthSetting: tfaSetting.twoFactorAuthStatus,
                                authId: authId.auth_id,
                                message: "Please enter the auth code from app",
                            })
                            
                        } else {
                            let token = createToken(user.id, user.email, user.login);
                            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                            res.status(200).json({
                                verified: tfaSetting.verified,
                                twoFactorAuthSetting: tfaSetting.twoFactorAuthStatus,
                                authId: authId.auth_id,
                                message: "You are succesfully logged in!",
                                token: token,
                            })
                        }
                        
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
    checkCurrentUser: checkCurrentUser,
}


