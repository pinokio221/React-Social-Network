const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


let cors = require("cors");

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, 
    credentials: true };

router.use(cookieParser());
router.use(cors(corsOptions));

router.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })


router.get('/login', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.json({
                message: "Authorization error. Wrong username or login",
                resultCode: 403
            })
        } else {
            res.json({
                message: "You are succesfully authorized",
                authData,
                resultCode: 0
                
            })
        }
    })
    
});
router.post('/signin', (req, res) => {

    const user = {
        id: req.query.id,
        login: req.query.login,
        email: req.query.email
    }
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.cookie('token', token);
        res.json({
            token
        })
        console.log(req.cookies['token']);
    });
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1]; // get token
        req.token = bearerToken; //set token
        next();
    } else {
        res.sendStatus(403);
    }
}


module.exports = router;



