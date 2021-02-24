const User = require('../models/User')


const getAllUsersFromDb = () => {
    let users = User.query().select(
        'id', 'login', 'first_name', 'last_name', 'fullname', 'gender',
        'status', 'age', 'city', 'profile_image', 'header_image')
    return users;
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

function returnUsers(req, res) {
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
        getAllUsersFromDb().then(function(users){
        const startIndex = (page-1) * limit;
        const endIndex = page * limit;
        items.items = users;
        let count = users.length;
        items.totalCount = count;
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