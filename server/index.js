const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const port = 9000;

let cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

//Import Routes
const usersRoute = require('./routes/users')
const postsRoute = require('./routes/posts')
app.use('/users', usersRoute);
app.use('/posts', postsRoute)



//Routes

app.get('/', (req, res) => {
    res.send("We are on home")
});


//Connect to DB 

//

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})