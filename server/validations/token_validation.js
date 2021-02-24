const { verify } = require('jsonwebtoken');

module.exports = {
    tokenValidation: (req, res, next) => {
        let token = req.get('authorization');
        if(token){
            token = token.slice(7);
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