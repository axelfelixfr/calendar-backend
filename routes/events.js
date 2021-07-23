/* 
    Rutas de Eventos / Events
    host + /api/events
*/

const { Router } = require('express'); // Traemos el Router de Express
const { check } = require('express-validator'); // Para hacer las validaciones usamos express-validator
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events'); // Extraemos las funciones de los controladores
const router = Router(); // Pasamos el router a una constante
const { validarJWT } = require('../middlewares/validar-jwt'); // Para validar el Json Web Tokens

// Todas las rutas tienen que pasar por el middleware de la validación JWT
router.use(validarJWT); // Con use, podemos hacer que el JWT sea usado por todas las rutas para la validación

// Obtener eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post('/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').not().isEmpty(),
        check('start', 'Fecha de inicio no es válida').custom(isDate),
        check('end', 'Fecha final es obligatoria').not().isEmpty(),
        check('end', 'Fecha final no es válida').custom(isDate),
        validarCampos
    ],
    crearEvento);

// Actualizar evento
router.put('/:id',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').not().isEmpty(),
        check('start', 'Fecha de inicio no es válida').custom(isDate),
        check('end', 'Fecha final es obligatoria').not().isEmpty(),
        check('end', 'Fecha final no es válida').custom(isDate),
        validarCampos
    ],
    actualizarEvento);

// Borrar evento
router.delete('/:id', eliminarEvento);

// Hacemos el export de router
module.exports = router;