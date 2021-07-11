const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
    nickname: {
        type: String,
        require: true
    },
    mail: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

async function generateHash(password) {
    return await bcrypt.hash(password, 12);
}

UsuarioSchema.pre('save', async function(next) {
    this.password = await generateHash(this.password);
    next();
});

UsuarioSchema.pre('findOneAndUpdate', async function(next) {
    let update = { ...this.getUpdate() };
    if(update.password) {
        update.password = await generateHash(this.getUpdate().password);
        this.setUpdate(update);
    }
    next();
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;