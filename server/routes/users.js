const express = require('express');
const router = express.Router();

let usersList = [
    {
            id: 1,
            fullname: "Keany Reeves",
            sex: "Male",
            status: "test",
            age: 29,
            phone_number: "0976541884",
            email: "test@gmail.com",
            city: "Los Angeles",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://d3b4yo2b5lbfy.cloudfront.net/wp-content/uploads/2019/06/d6a1f2019-CP-Forum-Avatars-TealfulEyes-Kodan.png",
            headerImage: "https://blog.theclymb.com/wp-content/uploads/2013/06/adventure_travel_header.jpg"
        },
        {
            id: 2,
            fullname: "Boris Gulyav",
            sex: "Male",
            status: "test",
            age: 31,
            phone_number: "0976541884",
            email: "test@gmail.com",
            city: "Moscow",
            isFriend: false,
            friendInventation: true,
            profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQecV_20snjsbgZSClHCml7tnMWvSYCD7ojqQ&usqp=CAU",
            headerImage: "https://blog.theclymb.com/wp-content/uploads/2013/06/adventure_travel_header.jpg"

        },
        {
            id: 3,
            fullname: "Genadiy Bukin",
            sex: "Male",
            status: "test",
            age: 37,
            phone_number: "0976541884",
            email: "test@gmail.com",
            city: "Ekaterinburg",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://i2.wp.com/avatarfiles.alphacoders.com/161/161678.jpg",
            headerImage: "https://blog.theclymb.com/wp-content/uploads/2013/06/adventure_travel_header.jpg"


        },
        {
            id: 4,
            fullname: "Grisha Piven",
            sex: "Male",
            status: "test",
            age: 29,
            phone_number: "0976541884",
            email: "test@gmail.com",
            city: "Kyiv",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg",
            headerImage: "https://blog.theclymb.com/wp-content/uploads/2013/06/adventure_travel_header.jpg"

        },
        {
            id: 5,
            fullname: "Andrey Rogozin",
            sex: "Male",
            status: "test",
            age: 35,
            phone_number: "0976541884",
            email: "test@gmail.com",
            city: "St. Petersburg",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg",
            headerImage: "https://blog.theclymb.com/wp-content/uploads/2013/06/adventure_travel_header.jpg"

        },
        {
            id: 6,
            fullname: "Henry Ford",
            sex: "Male",
            status: "test",
            age: 28,
            phone_number: "0976541884",
            email: "test@gmail.com",
            city: "Miami",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg",
            headerImage: "https://blog.theclymb.com/wp-content/uploads/2013/06/adventure_travel_header.jpg"

        },
        {
            id: 7,
            fullname: "Sam Bloom",
            sex: "Male",
            status: "test",
            age: 44,
            phone_number: "0976541884",
            email: "test@gmail.com",
            city: "London",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg",
            headerImage: "https://blog.theclymb.com/wp-content/uploads/2013/06/adventure_travel_header.jpg"

        },
        {
            id: 8,
            fullname: "Ivan Gopnik",
            sex: "Male",
            status: "test",
            age: 62,
            phone_number: "0976541884",
            email: "test@gmail.com",
            city: "Odessa",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg",
            headerImage: "https://blog.theclymb.com/wp-content/uploads/2013/06/adventure_travel_header.jpg"

        },
        {
            id: 9,
            fullname: "Hillary Clinton",
            sex: "Male",
            status: "test",
            age: 25,
            phone_number: "0976541884",
            email: "test@gmail.com",
            city: "New York",
            isFriend: true,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg",
            headerImage: "https://blog.theclymb.com/wp-content/uploads/2013/06/adventure_travel_header.jpg"

        },
        {
            id: 10,
            fullname: "Elliot Page",
            sex: "Male",
            status: "test",
            age: 16,
            phone_number: "0976541884",
            email: "test@gmail.com",
            city: "Chicago",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg",
            headerImage: "https://blog.theclymb.com/wp-content/uploads/2013/06/adventure_travel_header.jpg"

        },
        {
            id: 11,
            fullname: "Gregory Hills",
            sex: "Male",
            status: "test",
            age: 41,
            phone_number: "0976541884",
            email: "test@gmail.com",
            city: "Seattle",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg",
            headerImage: "https://blog.theclymb.com/wp-content/uploads/2013/06/adventure_travel_header.jpg"

        },
        {
            id: 12,
            fullname: "Kim Books",
            sex: "Male",
            status: "test",
            age: 23,
            phone_number: "0976541884",
            email: "test@gmail.com",
            city: "New York",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg",
            headerImage: "https://blog.theclymb.com/wp-content/uploads/2013/06/adventure_travel_header.jpg"

        },
        {
            id: 13,
            fullname: "Johnny Salvadore",
            sex: "Male",
            status: "test",
            age: 31,
            phone_number: "0976541884",
            email: "test@gmail.com",
            city: "Detroit",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg",
            headerImage: "https://blog.theclymb.com/wp-content/uploads/2013/06/adventure_travel_header.jpg"

        },
        {
            id: 14,
            fullname: "Johnny Salvadore",
            sex: "Male",
            status: "test",
            age: 31,
            phone_number: "0976541884",
            email: "test@gmail.com",
            city: "Detroit",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg",
            headerImage: "https://blog.theclymb.com/wp-content/uploads/2013/06/adventure_travel_header.jpg"

        },
        {
            id: 15,
            fullname: "Alexey Dubinin",
            sex: "Male",
            status: "test",
            age: 31,
            phone_number: "0976541884",
            email: "test@gmail.com",
            city: "Detroit",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg",
            headerImage: "https://blog.theclymb.com/wp-content/uploads/2013/06/adventure_travel_header.jpg"

        },
        {
            id: 16,
            fullname: "po4ka",
            sex: "Male",
            status: "test",
            age: 31,
            phone_number: "0976541884",
            email: "test@gmail.com",
            city: "Detroit",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg",
            headerImage: "https://blog.theclymb.com/wp-content/uploads/2013/06/adventure_travel_header.jpg"

        },
        
    
    ];


const getUsersByNamePartial = (query, usersList) => {
  const result = usersList.filter((user) => {
    return user.fullname.toLowerCase().includes(query)
  })
  return result;
}

const getUserById = (query, usersList) => {
    const result = usersList.find((user) => {
        return user.id === Number(query)
    })
    return result;
}

const getUsersByCityName = (query, usersList) => {
    const result = usersList.filter((user) => {
        return user.city.toLowerCase().includes(query);
    })
    return result;
}



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
    
    const items = {}
    const startIndex = (page-1) * limit;
    const endIndex = page * limit;
    items.items = usersList.slice(startIndex, endIndex);
    
    if(req.query.userId) {
        const user = getUserById(req.query.userId, usersList)
        res.send(user)
    }


    if (req.query.fullname) {
      const users = getUsersByNamePartial(req.query.fullname, usersList)
      items.items = users;
      items.usersFound = users.length
    }

    let count = usersList.length

    items.totalCount = count;

    res.send(items)
});   
// FILTERS
router.get('/filter', (req, res) => {

    const items = {}
    if(req.query.city) {
        const users = getUsersByCityName(req.query.city, usersList)
        items.items = users
        items.usersFound = users.length
    }
    res.send(items)
})




module.exports = router;

