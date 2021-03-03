const { verify } = require('jsonwebtoken');

module.exports = {
    tokenValidation: (req, res, next) => {
        let token = req.cookies.jwt;
        console.log(token)
        if(token){
            verify(token, 'my secret', (err, decoded) => {
                if(err) {
                    res.status(401).json({
                        message: "You are not authorized. Access denied",
                    })

                } else {
                    next();
                }
            })
        } else {
            res.status(401).json({
                message: "You are not authorized user. Access denied!"
            })
        }
    }
}