const jwt = require('jsonwebtoken');
const Message = require('../models/Message');
const Dialog = require('../models/Dialog');
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const verifyUser = require('../verifyUser');


const sentMessage = async (req, res, next) => {
    try{
        let user = verifyUser.getCurrentUser(req, res, next);
        if(user){
            let receiveUser = await User.query().select('id').where('id', req.body.receiveId).first()
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
                }).returning('id').then(function(id){
                    Message.query().insert({
                        dialogId: id.id,
                        author: user.userId,
                        content: req.body.content
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
                }).then(function(dialog){
                    Message.query().insert({
                        dialogId: dialog,
                        author: user.userId,
                        content: req.body.content
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
    sentMessage: sentMessage
}


