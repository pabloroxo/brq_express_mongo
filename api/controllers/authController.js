const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const Usuario = require('../models/usuario');

function generateToken(id) {
    return jwt.sign({ id }, authConfig.secret, { expiresIn: 86400 });
}

const router = express.Router();

router.post(
    '/register',
    body('nickname')
        .isLength({ min: 1 })
            .withMessage('O campo nickname é obrigatório'),
    body('mail')
        .isLength({ min: 1 })
            .withMessage('O campo mail é obrigatório')
            .bail()
        .normalizeEmail()
        .isEmail()
            .withMessage('O campo mail não contém um e-mail válido'),
    body('password')
        .isLength({ min: 1 })
            .withMessage('O campo password é obrigatório'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const { mail } = req.body;
        try {
            if (await Usuario.findOne({ mail: mail })) {
                return res.status(409).send({ error: 'E-mail já existente na base de dados' });
            }
            const usuario = await Usuario.create(req.body);
            usuario.password = undefined;
            res.status(201).send({
                usuario,
                token: generateToken(usuario.id),
            });
        } catch (err) {
            return res.status(500).send({ error: err.message });
        }
    }
);

router.post(
    '/authenticate',
    body('mail')
        .isLength({ min: 1 })
            .withMessage('O campo mail é obrigatório')
            .bail()
        .normalizeEmail()
        .isEmail()
            .withMessage('O campo mail não contém um e-mail válido'),
    body('password')
        .isLength({ min: 1 })
            .withMessage('O campo password é obrigatório'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const { mail, password } = req.body;
        try {
            const usuario = await Usuario.findOne({ mail }).select('+password');
            if (!usuario) {
                return res.status(404).send({ error: 'Usuário não encontrado' });
            }
            if (!await bcrypt.compare(password, usuario.password)) {
                return res.status(401).send({ error: 'A senha está incorreta' });
            }
            usuario.password = undefined;
            res.status(200).send({
                usuario,
                token: generateToken(usuario.id),
            });
        } catch (err) {
            return res.status(500).send({ error: err.message });
        }
    }
);

module.exports = app => app.use('/auth', router);