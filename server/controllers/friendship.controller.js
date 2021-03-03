const Friend = require('../models/Friend')
const { verify } = require('jsonwebtoken');


const returnInvitations = (req, res) => {
    let items = {}
    if(req.params.list === 'sent') {
        Friend.query().select('userId2')
        .where('userId1', 1).then(function(requests){
            items.items = requests;
            items.sentInvitations = items.items.length
            res.json(items)
        })
    }
    if(req.params.list === 'received'){
        Friend.query().select('userId1') // NEED TOKEN
        .where('userId2', 1).then(function(requests){
            items.items = requests;
            items.receivedInvitations = items.items.length
            res.json(items)
        })
    }
    
}

const sendRequest = (req, res) => {
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
                    Friend.query().select('status')
                    .where('userId1', decoded.userId)
                    .andWhere('userId2', req.params.to_id)
                    .first()
                    .then(async function(result){
                        if(result){
                            return res.status(400).json({
                                message: "You have already sent an invitation to this user."
                            })
                        }
                        Friend.query().insert({
                            userId1: decoded.userId,
                            userId2: req.params.to_id,
                            status: 1
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
                    Friend.query().select('status')
                    .where('userId1', decoded.userId)
                    .andWhere('userId2', req.params.to_id)
                    .first()
                    .then(async function(result){
                        if(!result){
                            return res.status(400).json({
                                message: "Invitation not found."
                            })
                        }
                        else {
                            if(result.status === 1){
                                Friend.query()
                                .where('userId1', decoded.userId)
                                .andWhere('userId2', req.params.to_id)
                                .del()
                                .then(function(result){
                                    res.status(200).json({
                                        message: "Your friend invitation canceled",
                                    })
                                })
                            }
                        }
                        
                    })
                }
            })
        }
    } catch(err) {
        res.status(400).send(err)
    }
}


module.exports = {
    sendRequest: sendRequest,
    cancelRequest: cancelRequest,
    returnInvitations: returnInvitations
}