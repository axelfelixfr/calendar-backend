const { response } = require('express'); // Importamos nuevamente Express para recuperar el intellisense
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario'); // Importamos el modelo del Usuario
const { generarJWT } = require('../helpers/jwt'); // Importamos los JSON Web Tokens

// En res pasamos el response de Express para el intellisense
const crearUsuario = async(req, res = response) => {

    // Desestructuramos el body de la request, entre ellas el email y password
    const { email, password } = req.body;

    try {

        // Buscamos el usuario a través de su email
        let usuario = await Usuario.findOne({ email });

        // Si el usuario ya existe entra a esta condición
        if(usuario){
            // Regresa el status 400, que significa Bad Request
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo'
            }); 
        }

        // Usando el modelo Usuario, hacemos una nueva instancia de él pasandole todo el body de la request
        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();

        // Obtenemos la contraseña del usuario (usuario.password) 
        // Con bcrypt mandamos tanto el password (que esta en la request) como el salt (contraseña encriptada)
        usuario.password = bcrypt.hashSync(password, salt);
        
        // Guardamos el usuario con save()
        await usuario.save();

        // Generador nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);

        // NO se deben enviar más de una respuesta (res), ya que esto desataría un error
        // El status pasa a 201 si es que pasa la validación, que significa 'Created'
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    
    // Cachamos los errores 
    } catch (error) {
        console.log(error); // Imprimos en consola el error
        // Regresa el status 500, que significa Internal Server Error
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const loginUsuario = async(req, res = response) => {

    // Desestructamos el email y password obtenidos a través del body de la request
    const { email, password } = req.body;

    try {

        // Buscamos el usuario con findOne a través del modelo 'Usuario' con el email de la request 
        const usuario = await Usuario.findOne({ email });

        // Si el usuario no se encontro entonces entra en esta condición
        if(!usuario){
            // Regresa el status 400, que significa Bad Request
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese correo'
            })
        }

        // Confirmar contraseñas
        // Se comparan las contraseña con compareSync
        const validPassword = bcrypt.compareSync(password, usuario.password);

        // Si la contraseña no hace match con la que esta en la base de datos, entonces entra a esta condición
        if(!validPassword){
            // Regresa el status 400, que significa Bad Request
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        // Generador nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);

        // Si paso todas las validaciones, devuelve el id y nombre del usuario y su token
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        console.log(error); // Imprimos en consola el error
        // Regresa el status 500, que significa Internal Server Error
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

const revalidarToken = async(req, res = response) => {

    // Obtenemos el name y id de la request
    const { uid, name } = req;

    // Generador nuestro JWT
    const token = await generarJWT(uid, name); // Generamos el token

    // Mandamos el token
    res.json({
        ok: true,
        msg: 'renew',
        token
    });
}

// Exportamos como un objeto todas las funciones
module.exports = {
    crearUsuario, loginUsuario, revalidarToken
}