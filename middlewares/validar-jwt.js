const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next) => {
    // Lo pediré en los headers, con x-token, de igual forma es común poner una 'x' al inicio del header
    const token = req.header('x-token');

    // Si el token no existe entonces entra a esta condición
    if(!token){
        // Retornamos el status 401, que significa Unauthorized
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        // Obtenemos el id y name que se obtiene con la verificación
        // Al verify() de JWT le pasamos el token de autenticación y la palabra secreta que se obtiene de las variables de entorno
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        // Pasamos a la request el id y name obtenidos de la verificación
        req.uid = uid;
        req.name = name;

    } catch (error) {
        // Regresa el status 401, que significa Unauthorized
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    // Si se renueva el JWT entonces pasa a lo siguiente con next()
    next();
}

// Exportamos la función para validar JWT
module.exports = {
    validarJWT
}