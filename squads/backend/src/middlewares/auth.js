require("dotenv/config");
//require("dotenv").load();
const jwt = require('jsonwebtoken'); //Implorta biblioteca de jwt

module.exports = {
    async verifyJWT( req, res, next ) {
        const token = req.headers['x-access-token'];
        if (!token) {
            res.status(401);
            return res.json({auth: false, info: 'No token provided.'});            
        }
    
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) {
                res.status(500);
                return res.json({ auth: false, info: 'Failed to authenticate token.' });
            }
    
            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id; 
            next();           
        });
    }
};