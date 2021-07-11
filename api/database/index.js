const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestre_pokemon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;