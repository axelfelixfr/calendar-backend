const jwt = require('jsonwebtoken');

// Para generar el Json Web Token es necesario el id y name del usuario
const generarJWT = (uid, name) => {

    // Retornamos una promesa, recordar que resolve y reject son propias de la promesa
    return new Promise((resolve, reject) => {

        // Extraemos del payload el id y name
        const payload = { uid, name };

        // Para generar el JWT necesitamos el payload, la clave secreta (que esta en .env) y la expiración (duración del JWT)
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {

            // Condición para cachar los erroes
            if(err) {
                // Si da un error, lo imprimimos en consola 
                console.log(err);
                
                // De igual forma devolvemos este string 
                reject('No se pudo generar el token')
            }

            // Si se resuelve entonces genera el token
            resolve(token);
        })
    })
}


module.exports = {
    generarJWT
}