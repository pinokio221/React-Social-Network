const Friend = require('../models/Friend')
const verifyUser = require('../verifyUser');
const usersController = require('../controllers/users.controller');


const returnUserFriends = (req, res, next) => {
    let items = {}
    //let user = verifyUser.getCurrentUser(req, res, next);
    Friend.query().select()
    .where('userId1', req.params.userId)
    .andWhere('status', 2)
    .orWhere('userId2',req.params.userId)
    .andWhere('status', 2)
    .then(async function(result){
        if(result){
            let users = [];
            let friendId;
            for(let value of result){
                if(value.userId1 == req.params.userId) { friendId = value.userId2 }
                else { friendId = value.userId1 }
                let friend = await usersController.getUserById(req, res, next, friendId);
                delete friend.friendshipStatus;
                users.push(friend)
            }
            items.items = users;
            items.totalFriends = items.items.length
        }
        res.json(items)
    })
}

const returnInvitations = async (req, res, next) => {
    let items = {}
    let user = verifyUser.getCurrentUser(req, res, next);
    if(req.params.list === 'sent') {
        if(user !== false){
            Friend.query().select('userId2')
            .where('userId1', user.userId)
            .andWhere('status', 1)
            .then(function(result){
                items.items = result;
                items.sentInvitations = items.items.length
                res.json(items)
            })
        }
    }
    if(req.params.list === 'received'){
        Friend.query().select('userId1') // NEED TOKEN
        .where('userId2', user.userId)
        .andWhere('status', 1)
        .then(function(requests){
            items.items = requests;
            items.receivedInvitations = items.items.length
            res.json(items)
        })
    }
    
}

const sendRequest = (req, res, next) => {
    try {
        let user = verifyUser.getCurrentUser(req, res, next);
        if(user){
            Friend.query().select('status')
            .where('userId1', user.userId)
            .andWhere('userId2', req.params.to_id)
            .first()
            .then(async function(result){
                if(result){
                    if(result.status === 1){
                        return res.status(400).json({
                            message: "You have already sent an invitation to this user.",
                            friendshipStatus: result.status
                        })
                    }
                    if(result.status === 2){
                        return res.status(400).json({
                            message: "You are friends with this user",
                            friendshipStatus: result.status
                        })
                    }
                    
                }
                Friend.query().insert({
                            userId1: user.userId,
                            userId2: req.params.to_id,
                            status: 1
                        }).then(function(result){
                            res.status(201).json({
                                message: "Your friend invitation successfully sended",
                                friendshipStatus: result.status
                        })
                    })
                })
            }
    } catch(err) {
        res.status(400).send(err)
    }
    
}

const cancelRequest = (req, res, next) => {
    try {
        let user = verifyUser.getCurrentUser(req, res, next);
        if(user){
            Friend.query().select('status')
            .where('userId1', user.userId)
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
                        .where('userId1', user.userId)
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
    } catch(err) {
        res.status(400).send(err)
    }
}


module.exports = {
    sendRequest: sendRequest,
    cancelRequest: cancelRequest,
    returnInvitations: returnInvitations,
    returnUserFriends: returnUserFriends
}