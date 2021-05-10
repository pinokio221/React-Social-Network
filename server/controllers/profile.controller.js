const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { profile_status_validation } = require('../validations/profile_status_validation');
const verifyUser = require('../verifyUser');


const updateProfilePicture = (req, res, next) => {
    try {
        if(req.method == "PUT"){
            let user = verifyUser.getCurrentUser(req, res, next);
            if(user) {
                if(!req.files)
                        return res.status(400).send('No files were uploaded.');
                var file = req.files.uploaded_pic
                let image_name = file.name;
                let userPicPath = user.userId + '_pic.jpg';
                if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
                    file.mv('public/images/profile_pictures/' + userPicPath, function(err) {
                        if(err)
                            return res.status(500).send(err);
                        
                        let pictureURL = 'http://localhost:9000/images/profile_pictures/' + userPicPath; 
                        User.query().where('id', user.userId)
                        .update({
                            profile_image: pictureURL
                        }).then(function(result) {
                            res.status(200).json({
                                message: "Profile picture succesfully updated",
                                img: pictureURL
                            })
                        })
                    })
                }
            }

        }
    } catch(error) {
        res.status(400).send(error);
    }
}


const updateProfileStatus = (req, res, next) => {
    const { error } = profile_status_validation(req.body);
    if(error) { return res.status(400).json(error.details[0].message) }

    try {
        let user = verifyUser.getCurrentUser(req, res, next);
        if(user){
            if(req.body.status.length <= 255) {
                User.query().where('id', '=', user.userId)
                .update({
                    status: req.body.status
                }).then(function(result) {
                    res.status(200).json({
                        message: "Profile status updated",
                        status: req.body.status
                    })
                })
            } else {
                res.status(400).json({
                    message: "Max length of status is 255!"
                })
            }
            
        }
    } catch(err) {
        res.status(400).send(err);
    }
}

const getProfileStatus = (req, res) => {
    try {
        User.query().select('id','status').first()
        .where('id', req.params.userId)
        .then(function(result) {
            if(result){
                res.json({
                    userId: result.id,
                    status: result.status
                })
            } else {
                res.status(404).json({
                    message: "User not found"
                })
            }
        })
    } catch(err) {
        res.status(400).send(err);
    }
}

module.exports = {
    updateProfilePicture: updateProfilePicture,
    updateProfileStatus: updateProfileStatus,
    getProfileStatus: getProfileStatus
}


