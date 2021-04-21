const qrcode = require('qrcode');
const { json_db } = require('./auth.controller')
const speakeasy = require('speakeasy');
const User = require('../models/User')
const verifyUser = require('../verifyUser');


const getAuthUserData = (auth_id) => {
    const path = `/user/${auth_id}`
    return json_db.getData(path);
}

const getQRCode = async (req, res, next) => {
    try {
        let user = verifyUser.getCurrentUser(req, res, next);
        if(user) {
            User.query().select('auth_id', 'verified')
            .where('id', user.userId).first()
            .then(async function(result) {
                if(result){
                    const userAuthData = await getAuthUserData(result.auth_id);
                    if(result.verified) {
                        qrcode.toDataURL(userAuthData.secret.otpauth_url, function(err, data) {
                            console.log(1)
                            res.status(200).json({
                                'QRCode': data
                            })
                        })
                    } else {
                        qrcode.toDataURL(userAuthData.temp_secret.otpauth_url, function(err, data) {
                            console.log(2)
                            res.status(200).json({
                                'QRCode': data
                            })
                        })
                    }
                    
                } else {
                    res.status(404).json({
                        message: "QR Code not found"
                    })
                }
            })
        } else {
            let authId = req.cookies.auth_id;
            if(authId) {
                const userAuthData = await getAuthUserData(authId);
                qrcode.toDataURL(userAuthData.temp_secret.otpauth_url, function(err, data) {
                    res.status(200).json({
                        'QRCode': data
                    })
                })
            } else {
                res.status(404).send();
            }
            
        }
        
    } catch(err) {
        res.status(400).send(err);
    }
}

const twoFactorVerify = (req, res) => {
    const {token, userId} = req.body;
    try {
        const path = `/user/${userId}`
        const user = json_db.getData(path);
        const { base32:secret } = user.temp_secret
        const verified = speakeasy.totp.verify({ secret, encoding: 'base32', token })

        if(verified) {
            json_db.push(path, { id: userId, secret: user.temp_secret })
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
        const user = json_db.getData(path);
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

module.exports = {
    getQRCode: getQRCode,
    twoFactorVerify: twoFactorVerify,
    twoFactorValidate: twoFactorValidate,
}