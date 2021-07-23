const { Schema, model } = require('mongoose');

// Definimos el schema del evento para hacer los registros
const EventoSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

// Con required hacemos que title, start, end y user sean obligatorios
// El type de usuario, lo obtenemos con el schema del 'Usuario' y en Types obtenemos el id del objeto

// Modificamos el JSON que se obtiene una vez hecho el schema 
EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object; 
}); // Modificamos el id en el JSON que se obtiene, con object.id = _id, para que ahora aparezca solo id
// Sacamos el __v del JSON pero lo ignoramos cuando hacemos el return del object

// Exportamos el modelo del Evento tomando el schema que definimos 
module.exports = model('Evento', EventoSchema);