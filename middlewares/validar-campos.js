const { response } = require('express');
const { validationResult } = require('express-validator'); // Para hacer las validaciones usamos express-validator

const validarCampos = (req, res = response, next) => {

    // Validación sencilla para el nombre:
    /*
    if(name.length < 5){
        // Podemos cambiar el estatus con .status()
        return res.status(400).json({
            ok: false,
            mgs: 'El nombre de ser de 5 letras'
        })
    }}
    */

    // Manejo de errores
    const errors = validationResult(req); // Pasamos la request en validationResult de express-validator

    // La función isEmpty() nos devuelve si errors esta vacío o no
    // Hacemos la negación de eso, para que nos devuelva si hay errores
    if(!errors.isEmpty()){
        // Se regresa un status 400, que significa 'Bad Request'
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        }); // Con la función mapped() recorremos todos los errores que no pasa en express-validator
    }

    // Si las validaciones pasaron, ejecutamos next()
    next();
}

// Exportamos la función validarCampos()
module.exports = {
    validarCampos
}