const { verify } = require('jsonwebtoken');

module.exports = {
    getCurrentUser(req, res, next) {
        console.log(req.cookies)
        let token = req.cookies.jwt;
        if(token){
            return verify(token, 'my secret', (err, decoded) => {
                if(err) {
                    res.status(401).json({
                        message: "You are not authorized",
                    })
                    res.locals.user = null;
                    next();
                } else {
                    return decoded;
                }
            })
        }
        else {
            return false;
        }
    }
}