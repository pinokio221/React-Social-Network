const jwt = require('jsonwebtoken');
const Message = require('../models/Message');
const Dialog = require('../models/Dialog');
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const verifyUser = require('../verifyUser');

const returnDialogUser = async (userid) => {
    return User.query().select('login', 'first_name', 'last_name', 'fullname',
        'profile_image')
    .where('id', userid)
    .first()
    .then(async function(result) {
        if(result){
            return result;
        }
    });
    
}

const returnDialogMessages = (req, res, next) => {
    try{
        let items = {}
        let user = verifyUser.getCurrentUser(req, res, next);
        if(user){
            let dialogId = parseInt(req.query.dialog);
            Dialog.query().select('id')
            .where('sendId', user.userId)
            .andWhere('id', dialogId)
            .orWhere('receiveId', user.userId)
            .andWhere('id', dialogId)
            .first().then(async function(result){
                if(!result){
                    return res.status(400).json({
                        message: "You do not have access to this dialog"
                    })
                }
                Message.query().select()
                .where('dialogId', result.id).then(async function(message_result){
                    if(message_result){
                        let messages = [];
                        for(let value of message_result){
                            let dialogUser = await returnDialogUser(value.author);
                            value.authorData = dialogUser;
                            messages.push(value)
                        }
                        items.items = messages;
                        items.totalMessages = items.items.length
                    }
                    res.status(200).send(items);
                })
            })
        }
    }catch(err){
        res.status(400).send(err)
    }
}

const returnUserDialogById = (req, res, next) => {
    try {
        let items = {}
        let user = verifyUser.getCurrentUser(req, res, next);
        if(user){
            Dialog.query().select()
            .where('sendId', user.userId)
            .andWhere('id', req.query.id)
            .orWhere('receiveId', user.userId)
            .andWhere('id', req.query.id)
            .first()
            .then(async function(result){
                if(result){
                    let interlocutorId;
                    if(result.sendId == user.userId) { interlocutorId = result.receiveId }
                    else { interlocutorId = result.sendId }
                    let dialog = await User.query().select(
                        'id', 'first_name','last_name','fullname','profile_image')
                        .where('id', interlocutorId).first()
                        dialog.dialogId = result.id
                    items.items = dialog;
                    items.totalDialogs = items.items.length;
                }
                else {
                    return res.status(400).json({
                        message: "You do not have access to this dialog"
                    })
                }
                res.status(200).json(items)
            })
        }
    }catch(err){
        res.status(400).send(err)
    }
}

const returnUserDialogs = (req, res, next) => {
    try {
        if(req.query.id) {
            return returnUserDialogById(req, res, next);
        }
        let items = {}
        let user = verifyUser.getCurrentUser(req, res, next);
        if(user){
            Dialog.query().select()
            .where('sendId', user.userId)
            .orWhere('receiveId', user.userId).then(async function(result){
                if(result){
                    let dialogs = [];
                    let interlocutorId;
                    for(let value of result){
                        if(value.sendId == user.userId) { interlocutorId = value.receiveId }
                        else { interlocutorId = value.sendId }
                        let dialog = await User.query().select(
                            'id', 'first_name','last_name','fullname','profile_image')
                            .where('id', interlocutorId).first()
                            dialog.dialogId = value.id
                            dialogs.push(dialog);
                    }
                    items.items = dialogs;
                    items.totalDialogs = items.items.length;
                }
                res.status(200).json(items)
            })
        }
    }catch(err){
        res.status(400).send(err)
    }
}

const sentMessage = async (req, res, next, receiveId, message) => {
    try{
        let user = verifyUser.getCurrentUser(req, res, next);
        if(user){
            let receiveUser = await User.query().select('id').where('id', receiveId).first()
            if(!receiveUser){
                return res.status(404).json({
                    message: "User not found"
                })
            }
            let dialog = await Dialog.query().select('id').first()
                .where('receiveId', receiveUser.id)
                .andWhere('sendId', user.userId)
                .orWhere('receiveId', user.userId)
                .andWhere('sendId', receiveUser.id)
            if(!dialog){
                Dialog.query().insert({
                    status: '0',
                    sendId: user.userId,
                    receiveId: receiveUser.id,
                }).then(function(id){
                    Message.query().insert({
                        dialogId: id.id,
                        author: user.userId,
                        content: message
                    }).then(function(){
                        res.status(201).json({
                            message: "Message succesfully send"
                        })
                    })
                })
            } else {
                Dialog.query().where('id', dialog.id).update({
                    status: '0',
                    sendId: user.userId,
                    receiveId: receiveUser.id
                }).then(async function(){
                    await Message.query().insert({
                        dialogId: dialog.id,
                        author: user.userId,
                        content: message
                    }).then(function(){
                        res.status(201).json({
                            message: "Message succesfully send!!!"
                        })
                    })
                })
            }

        }

    }catch(err) {
        res.status(400).send(err)
    }
}



module.exports = {
    returnUserDialogs: returnUserDialogs,
    returnDialogMessages: returnDialogMessages,
    sentMessage: sentMessage
}


