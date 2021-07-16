const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ error: 'Token não informado' });
    }

    const partes = token.split(' ');

    if (partes.length !== 2) {
        return res.status(401).send({ error: 'O token é inválido (e1)' });
    }

    if (partes[0] !== 'Bearer') {
        return res.status(401).send({ error: 'O token é inválido (e2)' });
    }

    jwt.verify(partes[1], authConfig.secret, (err, decoded) => {
        let error;
        if (err) {
            switch (err.name) {
                case 'JsonWebTokenError':
                        error = 'O token é inválido (e3)';
                    break;
                case 'TokenExpiredError':
                        error = 'O token está expirado';
                    break;
                default:
                        error = 'Erro com o token: ' + err.name + ' - ' + err.message;
                    break;
            }
            return res.status(401).send({ error: error });
        }

        req.id = decoded.id;
    })
    
    next();
};