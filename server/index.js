const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = 9000;

const rateLimit = require('express-rate-limit');
require('dotenv').config()

let cors = require("cors");


/*app.use(rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 500,
  message: ({
    code: 429,
    message: "Too many requests from this IP adress"
  })
}));*/

app.use(cors({ origin: '*' , credentials: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next()
  })


require('./sockets/chat').listen(server);

//Import Routes
const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const friendshipRoute = require('./routes/friendship');
const chatRoute = require('./routes/chat')


app.use(express.json());
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/user', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/friendship', friendshipRoute);
app.use('/api/chat', chatRoute);


app.get('/', (req, res) => {
    res.send("We are on home");
});
server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})