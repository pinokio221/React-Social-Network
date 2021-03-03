const FriendRequest = require('../models/FriendRequest')
const { verify } = require('jsonwebtoken');

const sentRequest = (req, res) => {
    try {
        let token = req.cookies.jwt;
        if(token){
            verify(token, 'my secret', (err, decoded) => {
                if(err) {
                    res.status(401).json({
                        message: "You are not authorized",
                    })
                    res.locals.user = null;
                    console.log(decoded)
                    next();
                } else {
                    FriendRequest.query().select('id')
                    .where('from_id', decoded.userId)
                    .andWhere('to_id', req.params.to_id)
                    .first()
                    .then(async function(result){
                        if(result){
                            return res.status(400).json({
                                message: "You have already sent an invitation to this user."
                            })
                        }
                        FriendRequest.query().insert({
                            from_id: decoded.userId,
                            to_id: req.params.to_id,
                        }).then(function(result){
                            res.status(201).json({
                                message: "Your friend invitation successfully sended",
                            })
                        })
                    })
                }
            })
        }
    } catch(err) {
        res.status(400).send(err)
    }
    
}

const cancelRequest = (req, res) => {
    try {
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
                    FriendRequest.query().select('id')
                    .where('from_id', decoded.userId)
                    .andWhere('to_id', req.params.to_id)
                    .first()
                    .then(async function(result){
                        if(!result){
                            return res.status(400).json({
                                message: "Invitation not found."
                            })
                        }
                        FriendRequest.query()
                        .where('from_id', decoded.userId)
                        .andWhere('to_id', req.params.to_id)
                        .del()
                        .then(function(result){
                            res.status(200).json({
                                message: "Your friend invitation canceled",
                            })
                        })
                    })
                }
            })
        }
    } catch(err) {
        res.status(400).send(err)
    }
}


module.exports = {
    sentRequest: sentRequest,
    cancelRequest: cancelRequest
}