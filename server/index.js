const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = 9000;


let cors = require("cors");
var corsOptions = {
    origin: '*',
    credentials: true };

app.use(cors(corsOptions));
app.use(bodyParser.json());



//Import Routes
const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');



app.use(express.json());
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/user', authRoute);

//Routes

app.get('/', (req, res) => {
    res.send("We are on home");
});


//

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})