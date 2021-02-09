const express = require("express");
const app = express();
const port = 9000;

let cors = require("cors");
let users = {
    "users": [
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
            age: 42,
            city: "Ekaterinburg",
            isFriend: false,
            friendInventation: false,
            profileImage: "https://i2.wp.com/avatarfiles.alphacoders.com/161/161678.jpg"

        },
        {
            id: 4,
            fullname: "Andrey Rogozin",
            age: 54,
            city: "Ekaterinburg",
            isFriend: true,
            friendInventation: false,
            profileImage: "https://avatarfiles.alphacoders.com/181/181460.jpg"
        }
    ]
}

app.use(cors());
app.get('/users', (req, res) => {
    res.send(users)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})