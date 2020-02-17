const logger = require('../middlewares/logger');
const jwt = require('jsonwebtoken'); //Implorta biblioteca de jwt

module.exports = {
    async store( req, res ) {
        try {
            const { username, password } = req.body;            
            if (username === 'squads' && password === 'squads') {
                //auth ok                
                return res.status(200).json({
                    auth: true, token: jwt.sign({ id: 1 }, process.env.SECRET, {
                        expiresIn: process.env.EXPIRES_IN
                    }),
                });                
            } else {
                logger.error(e).info(JSON.stringify(req.body));
                return res.status(401).json({ auth: false, token: null });
            }
        } catch (e) {
            logger.error(e).info(JSON.stringify(req.body));
            return res.status(500).json({info: 'falha ao validar usuário.'});
        }
    }
};