const express = require('express');
const router = express.Router();

let usersList = [
    {
            id: 1,
            fullname: "Alex Menco",
            age: 29,
            city: "Los Angeles",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://d3b4yo2b5lbfy.cloudfront.net/wp-content/uploads/2019/06/d6a1f2019-CP-Forum-Avatars-TealfulEyes-Kodan.png"
        },
        {
            id: 2,
            fullname: "Boris Gulyav",
            age: 31,
            city: "Moscow",
            isFriend: false,
            friendInventation: true,
            profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQecV_20snjsbgZSClHCml7tnMWvSYCD7ojqQ&usqp=CAU"

        },
        {
            id: 3,
            fullname: "Genadiy Bukin",
            age: 37,
            city: "Ekaterinburg",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://i2.wp.com/avatarfiles.alphacoders.com/161/161678.jpg"

        },
        {
            id: 4,
            fullname: "Grisha Piven",
            age: 29,
            city: "Kyiv",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg"
        },
        {
            id: 5,
            fullname: "Andrey Rogozin",
            age: 35,
            city: "St. Petersburg",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg"
        },
        {
            id: 6,
            fullname: "Henry Ford",
            age: 28,
            city: "Miami",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg"
        },
        {
            id: 7,
            fullname: "Sam Bloom",
            age: 44,
            city: "London",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg"
        },
        {
            id: 8,
            fullname: "Ivan Gopnik",
            age: 62,
            city: "Odessa",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg"
        },
        {
            id: 9,
            fullname: "Hillary Clinton",
            age: 25,
            city: "New York",
            isFriend: true,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg"
        },
        {
            id: 10,
            fullname: "Elliot Page",
            age: 16,
            city: "Chicago",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg"
        },
        {
            id: 11,
            fullname: "Gregory Hills",
            age: 41,
            city: "Seattle",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg"
        },
        {
            id: 12,
            fullname: "Kim Books",
            age: 23,
            city: "New York",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg"
        },
        {
            id: 13,
            fullname: "Johnny Salvadore",
            age: 31,
            city: "Detroit",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg"
        },
        {
            id: 13,
            fullname: "Johnny Salvadore",
            age: 31,
            city: "Detroit",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg"
        },
        {
            id: 13,
            fullname: "Alexey Dubinin",
            age: 31,
            city: "Detroit",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg"
        },
        
    
    ];


router.get('/', (req, res) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    if (req.query.limit > 100) {
        res.send("The number of users cannot exceed 100.")
    }
    if (!req.query.limit) {
        limit = 12;
    }
    if(!req.query.page) {
        page = 1;
    }
    const startIndex = (page-1) * limit;
    const endIndex = page * limit;
    const items = {}
    items.items = usersList.slice(startIndex, endIndex);
    let count = usersList.length

    items.totalCount = count;


    res.send(items)
});   



router.get('/:userId', async (req, res) => {
    try {
        const user = usersList[req.params.userId-1];
        if(!user) {res.send("User not found");}

        res.json(user);
    }catch(err) {
        res.json({message:err})
    }


})




module.exports = router;

