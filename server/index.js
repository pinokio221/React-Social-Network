const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 9000;
const dotenv = require('dotenv');

let cors = require("cors");
var corsOptions = {
    origin: '*',
    credentials: true };

app.use(cors(corsOptions));
app.use(bodyParser.json());
dotenv.config();


//Import Routes
const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true, useUnifiedTopology: true }, 
() => console.log('Connected to db!'))


app.use(express.json());
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/user', authRoute);

//Routes

app.get('/', (req, res) => {
    res.send("We are on home");
});


//Connect to DB 

//

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})