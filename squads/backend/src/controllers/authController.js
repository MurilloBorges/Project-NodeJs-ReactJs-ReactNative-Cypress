const logger = require('../middlewares/logger');
const jwt = require('jsonwebtoken'); //Implorta biblioteca de jwt

module.exports = {
    async show ( req, res ) {
        try {
            res.status(200);
            return res.json({ auth: false, token: null });
        } catch (e) {
            logger.error(e);
            logger.info('Retorno: falha ao deslogar usuário.');
            res.status(500);
            return res.json({info: 'falha ao deslogar usuário.'});
        }
    },

    async store ( req, res ) {
        try {
            const { user, pwd } = req.body;            
            if (user === 'squads' && pwd === 'squads') {
                //auth ok
                const id = 1; //esse id viria do banco de dados
                var token = jwt.sign({ id }, process.env.SECRET, {
                  expiresIn: 300 // expires in 5min
                });
                res.status(200);
                return res.json({ auth: true, token: token });
            } else {
                logger.error(e);
                logger.info(JSON.stringify(req.body));
                res.status(500);
                return res.json({info: 'Login inválido.'});
            }
        } catch (e) {
            logger.error(e);
            logger.info(JSON.stringify(req.body));
            res.status(500);
            return res.json({info: 'falha ao validar usuário.'});
        }
    }
};