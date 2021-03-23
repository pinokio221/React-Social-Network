const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = 9000;

let cors = require("cors");
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, 
    credentials: true };

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
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

//Routes

app.get('/', (req, res) => {
    res.send("We are on home");
});
server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})