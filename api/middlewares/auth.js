module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const jwt = require('jsonwebtoken');
    const authConfig = require('../config/auth.json');

    if (!token) {
        return res.status(401).send({ error: 'Token não informado'});
    }

    const partes = token.split(' ');

    if (partes.length !== 2) {
        return res.status(401).send({ error: 'O token é inválido (e1)'});
    }

    if (partes[0] !== 'Bearer') {
        return res.status(401).send({ error: 'O token é inválido (e2)'});
    }

    jwt.verify(partes[1], authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'O token é inválido (e3)', token: token});
        }

        req.id = decoded.id;
    })
    
    next();
};