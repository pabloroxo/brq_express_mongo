const express = require('express');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/auth');
const Pokemon = require('../models/pokemon');

const router = express.Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const pokemons = await Pokemon.find().sort('pokemonId');
        res.status(200).send({ pokemons });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

router.get('/:pokemonId', async (req, res) => {
    const pokemonId = req.params.pokemonId;
    try {
        const pokemon = await Pokemon.findOne({ pokemonId: pokemonId });
        res.status(200).send({ pokemon });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

router.post(
    '/',
    body('pokemonId')
        .isLength({ min: 1 })
            .withMessage('O campo pokemonId é obrigatório')
            .bail()
        .isNumeric()
            .withMessage('O campo pokemonId deve ser um número'),
    body('name')
        .isLength({ min: 1 })
            .withMessage('O campo name é obrigatório'),
    body('type')
        .isLength({ min: 1 })
            .withMessage('O campo type é obrigatório'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const data = req.body;
        try {
            if (await Pokemon.findOne({ pokemonId: data.pokemonId })) {
                return res.status(409).send({ error: 'Pokémon ID já existente na base de dados' });
            }
            const pokemon = await Pokemon.create(data);
            res.status(201).send({ pokemon });
        } catch (err) {
            return res.status(500).send({ error: err.message });
        }
    }
);

router.put(
    '/:pokemonId',
    body('pokemonId')
        .optional()
        .isLength({ min: 1 })
            .withMessage('Um valor no campo pokemonId é obrigatório, caso haja alteração')
            .bail()
        .isNumeric()
            .withMessage('O campo pokemonId deve ser um número'),
    body('name')
        .optional()
        .isLength({ min: 1 })
            .withMessage('Um valor no campo name é obrigatório, caso haja alteração'),
    body('type')
        .optional()
        .isLength({ min: 1 })
            .withMessage('Um valor no campo type é obrigatório, caso haja alteração'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const pokemonId = req.params.pokemonId;
        const data = req.body;
        try {
            if (!await Pokemon.findOne({ pokemonId: pokemonId })) {
                return res.status(404).send({ error: 'Pokémon não encontrado' });
            }
            const pokemon_exists = await Pokemon.findOne({ pokemonId: data.pokemonId });
            if (pokemon_exists && pokemonId != data.pokemonId) {
                return res.status(409).send({ error: 'Pokémon ID já existente na base de dados' });
            }
            const pokemon = await Pokemon.findOneAndUpdate({ pokemonId: pokemonId }, data, { new: true });
            res.status(200).send({ pokemon });
        } catch (err) {
            return res.status(500).send({ error: err.message });
        }
    }
);

router.delete('/:pokemonId', async (req, res) => {
    const pokemonId = req.params.pokemonId;
    try {
        if (!await Pokemon.findOne({ pokemonId: pokemonId })) {
            return res.status(404).send({ error: 'Pokémon não encontrado' });
        }
        await Pokemon.findOneAndRemove({ pokemonId: pokemonId });
        res.status(204).send();
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

module.exports = app => app.use('/pokemon', router);