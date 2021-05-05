const qrcode = require('qrcode');
const speakeasy = require('speakeasy');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');
const User = require('../models/User');
const Setting = require('../models/Setting');
const jwt = require('jsonwebtoken');

const json_db = new JsonDB(new Config('./db/chilltime-db', true, false, '/'));

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
    const {authId, authCode} = req.body;
    
    const path = `/user/${authId}`
    const user = json_db.getData(path);
    console.log(user)
    const { base32:secret } = user.temp_secret
    
    const verified = speakeasy.totp.verify({ secret, encoding: 'base32', token: authCode })

    if(verified) {
        try {
            User.query().select('id', 'email', 'login').where('auth_id', authId).first()
            .then(function(response) {
                if(response) {
                    Setting.query().update({ tfa_verified: true }).where('userId', response.id).then((result) => {
                        json_db.push(path, { id: authId, secret: user.temp_secret })
                        let token = createToken(response.id, response.email, response.login);
                        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                        res.status(200).json({
                            verified: true, 
                            twoFactorAuthSetting: false,
                            message: "You are succesfully logged in!",
                            token: token,
                        })
                    })
                }
            })
            
        } catch(error) {
            console.log(error)
        }
    } else {
        res.status(404).json({
            message: "Wrong authentication code. Access denied",
            verified: false
        })
    }
}

const twoFactorValidation = (req, res) => {
    const {authId, authCode} = req.body;
    try {
        const path = `/user/${authId}`
        const user = json_db.getData(path);
        const { base32:secret } = user.secret
        const tokenValidates = speakeasy.totp.verify({ secret, encoding: 'base32', token: authCode })
        if(!secret) {
            return res.status(400).json({
                message: "Your account is not verified"
            })
        }
        if(tokenValidates) {
            try {
                User.query().select('id', 'email', 'login').where('auth_id', authId).first()
                .then(function(response) {
                    if(response) {
                        let token = createToken(response.id, response.email, response.login);
                        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                        res.status(200).json({
                            validated: true,
                            message: "You are succesfully logged in!",
                            token: token,
                        })
                    } else {
                        res.status(404).json({
                            message: "User not found"
                        })
                    }
                })
            } catch(error) {
                console.log(error)
            }
        } else {
            res.status(404).json({
                message: "Wrong authentication code. Access denied",
                validated: false
            })
        }
    } catch(error) {
        res.status(400).send(error)
    }
}

const twoFactorAuthSettings = (req, res, userId) => {
    return Setting.query().select('tfa', 'tfa_verified').where('userId', userId).first().then((response) => {
        if(response) {
            return {
                twoFactorAuthStatus: response.tfa,
                verified: response.tfa_verified
            }
        } else {
            return false;
        }
    })
}

const getAuthUserData = (auth_id) => {
    const path = `/user/${auth_id}`
    return json_db.getData(path);
}

const getQRCode = (req, res, next) => {
    try {
        if(req.query.authId) {
            const authUserData = getAuthUserData(req.query.authId);
            if(authUserData.secret) {
                qrcode.toDataURL(authUserData.secret.otpauth_url, function(err, data) {
                    res.status(200).json({
                        'QRCode': data
                    })
                })
            } else {
                qrcode.toDataURL(authUserData.temp_secret.otpauth_url, function(err, data) {
                    res.status(200).json({
                        'QRCode': data
                    })
                })
            }
        }
        else {
            res.status(404).json({
                message: 'User not found'
            })
        }
        
    } catch(err) {
        res.status(400).send(err);
    }
}


module.exports = {
    getQRCode: getQRCode,
    twoFactorValidation: twoFactorValidation,
    twoFactorVerify: twoFactorVerify,
    twoFactorAuthSettings: twoFactorAuthSettings
}