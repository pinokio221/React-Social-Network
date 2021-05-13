const Friend = require('../models/Friend')
const verifyUser = require('../verifyUser');
const usersController = require('../controllers/users.controller');


const returnUserFriends = (req, res, next) => {
    let page = parseInt(req.query.page)
    let limit = 12;
    let items = {}
    //let user = verifyUser.getCurrentUser(req, res, next);
    if(!req.query.page) { page = 1; }
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
                users.push(friend)
            }
            const startIndex = (page-1) * limit;
            const endIndex = page * limit;
            items.items = users.slice(startIndex, endIndex);
            items.page = page;
            items.friendsDisplayed = items.items.length;
            items.totalFriends = users.length;
        }
        res.json(items)
    })
}

const returnInvitations = async (req, res, next) => {
    let items = {}
    let page = parseInt(req.query.page);
    let limit = 12;
    let user = verifyUser.getCurrentUser(req, res, next);
    if(!req.query.page){ page = 1;  }
    if(req.params.list === 'sent') {
        if(user !== false){
            Friend.query().select('userId2')
            .where('userId1', user.userId)
            .andWhere('status', 1)
            .then(function(result){
                const startIndex = (page-1) * limit;
                const endIndex = page * limit;
                items.items = result.slice(startIndex, endIndex);
                items.page = page;
                items.invitationsDisplayed = items.items.length;
                items.sentInvitations = result.length;
                res.status(200).json(items)
            })
        }
    }
    if(req.params.list === 'received'){
        Friend.query().select('userId1') // NEED TOKEN
        .where('userId2', user.userId)
        .andWhere('status', 1)
        .then(async function(result){
            let invitations = [];
            for(value of result) {
                let invitation = await usersController.getUserById(req, res, next, value.userId1);
                invitations.push(invitation);
            }
            const startIndex = (page-1) * limit;
            const endIndex = page * limit;
            items.items = invitations.slice(startIndex, endIndex);
            items.page = page;
            items.invitationsDisplayed = items.items.length;
            items.receivedInvitations = result.length;
            res.status(200).json(items)
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
                    if(result.status === 3){
                        return res.status(400).json({
                            message: "This user has already refused your request",
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

const acceptRequest = (req, res, next) => {
    try {
        let user = verifyUser.getCurrentUser(req, res, next);
        if(user){
            Friend.query().select('status')
            .where('userId1', req.params.id)
            .andWhere('userId2', user.userId)
            .first()
            .then(async function(result){
                if(result){
                    if(result.status === 1){
                        Friend.query()
                        .where('userId1', req.params.id)
                        .andWhere('userId2', user.userId)
                        .update({
                            status: 2
                        }).then(function(result) {
                            res.status(200).json({
                                message: "You accepted friend invitation",
                            })
                        })
                    } else {
                        return res.status(404).send()
                    }
                } else {
                    return res.status(404).send()
                    }
                })
            }
    } catch(err) {
        res.status(400).send(err)
    }
}

const rejectRequest = (req, res, next) => {
    try {
        let user = verifyUser.getCurrentUser(req, res, next);
        if(user){
            Friend.query().select('status')
            .where('userId1', req.params.id)
            .andWhere('userId2', user.userId)
            .first()
            .then(async function(result){
                if(result){
                    if(result.status === 1){
                        Friend.query()
                        .where('userId1', req.params.id)
                        .andWhere('userId2', user.userId)
                        .update({
                            status: 3 // reject
                        }).then(function(result) {
                            res.status(200).json({
                                message: "You rejected friend invitation",
                            })
                        })
                    } else {
                        return res.status(404).send()
                    }
                } else {
                    return res.status(404).send()
                    }
                })
            }
    } catch(err) {
        res.status(400).send(err)
    }
}

const removeFriend = (req, res, next) => {
    try {
        let user = verifyUser.getCurrentUser(req, res, next);
        if(user){
            Friend.query().select('status')
            .where('userId1', user.userId)
            .andWhere('userId2', req.params.id)
            .orWhere('userId2', user.userId)
            .andWhere('userId1', req.params.id)
            .first()
            .then(async function(result){
                if(!result){
                    return res.status(400).json({
                        message: "This user is not your friend"
                    })
                }
                else {
                    console.log(result)
                    if(result.status === 2){
                        Friend.query()
                        .where('userId1', user.userId)
                        .andWhere('userId2', req.params.id)
                        .orWhere('userId2',  user.userId)
                        .andWhere('userId1', req.params.id)
                        .del()
                        .then(function(result){
                            res.status(200).json({
                                message: "You remove this user from your friends"
                        })
                    })
                } else {
                    res.status(400).json({
                        message: "This user is not your friend"
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
    acceptRequest: acceptRequest,
    rejectRequest: rejectRequest,
    removeFriend: removeFriend,
    returnInvitations: returnInvitations,
    returnUserFriends: returnUserFriends
}