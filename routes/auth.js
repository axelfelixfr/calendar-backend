/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express'); // Traemos el Router de Express
const { check } = require('express-validator'); // Para hacer las validaciones usamos express-validator
const router = Router(); // Pasamos el router a una constante
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth'); // Importamos los controladores
const { validarJWT } = require('../middlewares/validar-jwt'); // Para validar el Json Web Tokens

router.post(
    '/new', 
    [ // Middlewares para validación
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'Debe ser un email').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser de 6 carácteres').isLength({ min: 6 }),
        validarCampos
    ], crearUsuario);

router.post(
    '/',
    [ // Middlewares para validación
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'Debe ser un email').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser de 6 carácteres').isLength({ min: 6 }),
        validarCampos
    ], loginUsuario);

// En la ruta para renovar el JWT solo es necesario pasar el middleware de validarJWT, como solo es uno, no se hace un arreglo []
router.get('/renew', validarJWT, revalidarToken);

// Hacemos el export de router
module.exports = router;