const mongoose = require('../database');

const PokemonSchema = new mongoose.Schema({
    pokemonId: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
});

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon;