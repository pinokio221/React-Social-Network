const User = require('../models/User')
const FriendRequest = require('../models/FriendRequest');
const { verify } = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token = req.cookies.jwt;
    let result;
    if(token){
        verify(token, 'my secret', (err, decoded) => {
            if(err) {
                result = false;
                
            } else {
                result = decoded
            }
        })
    } else{
        res.status(401).json({
            message: "You are not authorized."
        })
        next();
    }
    return result;
}

function returnFriendshipStatus(req, res, next, userId){
    let userInfo = verifyToken(req, res, next);
    console.log(userInfo)
    return FriendRequest.query().select('id')
    .where('from_id', userInfo.userId)
    .andWhere('to_id', userId).then(function(result){
        if(result.length !== 0){
            return true;
        }
        else{
            return false;
        }
    })
}
const getAllUsersFromDb = async (req, res, next) => {
    let users = [];
    return User.query().select(
        'id', 'login', 'first_name', 'last_name', 'fullname', 'gender',
        'status', 'age', 'city', 'profile_image', 'header_image').then(async function(result){
            for(let user of result){
                let status = await returnFriendshipStatus(req, res, next, user.id);
                user.invitation = status;
                users.push(user)
            }
            return users;
        })
}

const getUsersByNamePartial = (query) => {
  let users = [];
  return User.query().select(
    'id', 'login', 'first_name', 'last_name', 'fullname', 'gender',
        'status', 'age', 'city', 'profile_image', 'header_image')
    .where('fullname', 'like', '%'+query+'%')
    .then(function(query) {
        query.forEach(function(value) {
            users.push(value);
        });
        return users;
    });

}

const getUserById = (query) => {
    return User.query().select(
        'id', 'login', 'first_name', 'last_name', 'fullname', 'gender',
        'status', 'age', 'city', 'profile_image', 'header_image')
    .where('id', query)
    .first()
    .then(function(result) {
        return result;
    });
}

const getUsersByCityName = (query) => {
    let users = [];
    return User.query().select(
        'id', 'login', 'first_name', 'last_name', 'fullname', 'gender',
        'status', 'age', 'city', 'profile_image', 'header_image')
        .where('city', query)
        .then(function(query) {
            query.forEach(function(value) {
                users.push(value);
            });
            return users;
        });
}

function returnUsers(req, res, next) {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    const items = {}
  
    if (req.query.limit > 100) {
        res.send("The number of users cannot exceed 100.")
    }

    if (!req.query.limit) {
        limit = 12;
    }

    if(!req.query.page) {
        page = 1;
    }

    if(req.query.userId) {
        getUserById(req.query.userId).then(function(user){
            items.items = user;
            res.send(user);
        })
        
    }

    else if(req.query.fullname) {
      getUsersByNamePartial(req.query.fullname).then(function(result){
          items.items = result;
          items.usersFound = result.length
          res.send(items);
      })
    }
    else {
        getAllUsersFromDb(req, res, next).then(function(users){
        const startIndex = (page-1) * limit;
        const endIndex = page * limit;
        items.items = users.slice(startIndex, endIndex);
        let count = users.length;
        items.totalUsers = count;
        items.usersDisplayed = items.items.length
        res.send(items)
    })
    }
}

function returnUsersByFilter(req, res){
    const items = {}
    if(req.query.city) {
        getUsersByCityName(req.query.city).then(function(result){
            items.items = result;
            items.usersFound = result.length
            res.send(items);
        })
    }
}

module.exports = {
    returnUsers: returnUsers,
    returnUsersByFilter: returnUsersByFilter
}