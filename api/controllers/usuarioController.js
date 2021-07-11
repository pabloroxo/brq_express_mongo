const express = require('express');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/auth');
const Usuario = require('../models/usuario');

const router = express.Router();
router.use(authMiddleware);

router.put(
    '/',
    body('nickname')
        .optional()
        .isLength({ min: 1 })
            .withMessage('Um valor no campo nickname é obrigatório, caso haja alteração'),
    body('mail')
        .optional()
        .isLength({ min: 1 })
            .withMessage('Um valor no campo mail é obrigatório, caso haja alteração')
            .bail()
        .normalizeEmail()
        .isEmail()
            .withMessage('O campo mail não contém um e-mail válido'),
    body('password')
        .optional()
        .isLength({ min: 1 })
            .withMessage('Um valor no campo password é obrigatório, caso haja alteração'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const id = req.id;
        const data = req.body;
        const mail_exists = await Usuario.findOne({mail: data.mail});
        if (mail_exists && mail_exists.id != id) {
            return res.status(409).send({ error: 'E-mail já existente na base de dados' });
        }
        try {
            const usuario = await Usuario.findByIdAndUpdate(id, data, { new: true });
            usuario.password = undefined;
            res.status(200).send({ usuario });
        } catch (err) {
            return res.status(500).send({ error: err.message });
        }
    }
);

module.exports = app => app.use('/usuario', router);