const { response } = require('express'); // Importamos nuevamente Express para recuperar el intellisense
const Evento = require('../models/Evento'); // Importamos el modelo del Evento

const getEventos = async (req, res = response) => {

    const eventos = await Evento.find() // Con find() nos traera todos los registros de ese modelo
                                .populate('user', 'name'); // Con populate() podemos llenar varias referencias (id) de otros registros
    // En este caso como necesitamos el usuario, ponemos 'user' dentro de la función, nos traera todos los datos del usuario a través de su id
    // En esta ocasión solo requerimos el id y el name, entonces como segundo argumento pedimos el 'name' del usuario

    // Retornamos los eventos
    res.json({
        ok: true,
        eventos
    })
}

const crearEvento = async (req, res = response) => {

    // Usamos el modelo 'Evento' para instanciar un nuevo objeto, y le mandamos todo el body de la request
    const evento = new Evento(req.body);

    try {

        // Obtenemos el id del usuario con 'req.uid' y se lo pasamos al evento, en el user (evento.user)
        evento.user = req.uid;

        // Guardamos el evento con save()
        const eventoGuardado = await evento.save();

        // Retornamos el nuevo evento
        res.json({
            ok: true,
            evento: eventoGuardado,
        })

    } catch (error) {
        console.log(error); // Imprimos en consola el error
        // Regresa el status 500, que significa Internal Server Error
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    
}

const actualizarEvento = async(req, res = response) => {
    
    // Obtenemos el id (del evento) que se manda por los parámetros
    const eventoId = req.params.id; // Ahora el id del evento estará por los parámetros, entonces usamos params

    // Obtenemos el id de la request
    const uid = req.uid;

    try {

        // Buscamos el evento por su id con findById() y le mandamos el eventoId de los parámetros
        const evento = await Evento.findById(eventoId);

        // Si el evento no se encontro entonces entra a esta condición
        if(!evento){
            // Regresa el status 404, que significa Not Found
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado por ese id'
            });
        }

        // Convertimos el parámetro user del evento a un string con toString()
        // Ahora lo comparamos con uid que se obtuvo en la request
        // Si no coinciden entonces entra a esta condición
        if(evento.user.toString() !== uid){
            // Regresa el status 401, que significa Unauthorized
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        // Creamos un nuevo evento, con el body de la request y el id del user
        const nuevoEvento  = {
            ...req.body,
            user: uid
        }

        // Buscamos y actualizamos el evento con findByIdAndUpdate
        // El primer argumento (eventoId, ...) es el evento que queremos cambiar, que lo obtenemos por los parámetros
        // El segundo argumento ( , nuevoEvento) es el evento nuevo (actualizado) que queremos en la base de datos
        // El tercer argumento ( , , { new:true }) es para que actualice y veamos una realizada la petición el evento actualizado
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });
        
        // Retornamos el evento actualizado
        res.json({
            ok: true,
            evento: eventoActualizado
        });
        
    } catch (error) {
        console.log(error); // Imprimos en consola el error
        // Regresa el status 500, que significa Internal Server Error
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const eliminarEvento = async(req, res = response) => {
    
    // Obtenemos el id (del evento) que se manda por los parámetros
    const eventoId = req.params.id; // Ahora el id del evento estará por los parámetros, entonces usamos params

    // Obtenemos el id de la request
    const uid = req.uid;

    try {

        // Buscamos el evento por su id con findById() pasandole el eventoId que se obtuvo por los parámetros
        const evento = await Evento.findById(eventoId);

        // Si el evento no fue encontrado entra a esta condición
        if(!evento){
            // Regresa el status 404, que significa Not Found
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado por ese id'
            });
        }

        // Convertimos el parámetro user del evento a un string con toString()
        // Ahora lo comparamos con uid que se obtuvo en la request
        // Si no coinciden entonces entra a esta condición
        if(evento.user.toString() !== uid){
            // Regresa el status 401, que significa Unauthorized
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }

        // Buscamos el evento y lo eliminamos con findByIdAndDelete()
        // Pasandole su id con eventoId que se obtuvo por los parámetros
        await Evento.findByIdAndDelete(eventoId);

        // Retornamos que todo fue hecho correctamente con 'ok: true'
        res.json({
            ok: true
        });
        
        // Cachamos el error si lo hay
    } catch (error) {
        console.log(error); // Imprimos en consola el error
        // Regresa el status 500, que significa Internal Server Error
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// Exportamos cada función del CRUD de eventos
module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}