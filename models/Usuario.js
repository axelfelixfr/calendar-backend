const { Schema, model } = require('mongoose');

// Definimos el schema del usuario para hacer los registros
const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Exportamos el modelo del Usuario tomando el schema que definimos 
module.exports = model('Usuario', UsuarioSchema);