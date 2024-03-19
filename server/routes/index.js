const { Router } = require('express');
// Importar todos los routers;
const { productHandler, postProductHandler, deleteProductHandler, updateProductHandler } = require('../handlers/productHandler');
const { postUserHandler, userHandler, updateUserHandler, deleteUserHandler } = require('../handlers/userHandler');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validations');
const { isRoleValid, emailExists, userIdExists, userIsActive } = require('../helpers/dbvalidators');
const { loginHandler } = require('../handlers/loginHandler');
const { validarJWT } = require('../middlewares/validarJWT');


const router = Router();

// auth routes

router.post('/auth/login', [
  check('email','Email obligatorio.').isEmail(),
  check('password','Password obligatorio.').not().isEmpty(),
  check('email','Email no existe.').not().custom( emailExists ),
  check('email').custom(userIsActive),
  validarCampos
],loginHandler);

// Product routes

router.post('/product', postProductHandler);

router.get('/products', productHandler);

router.put('/product/:id', updateProductHandler);

router.delete('/product/:id', deleteProductHandler);


// User routes

router.post('/user', [
  check('username', 'Nombre de usuario obligatorio.').not().isEmpty(),
  check('password', 'El password debe tener minimo 6 caracteres.').isLength({min:6}),
  check('email', 'Correo no válido').isEmail(),
  check('email').custom(emailExists),
  //check('rol','Rol no válido').isIn(['admin','user']),
  check('rol').custom( isRoleValid ),
  validarCampos
] ,postUserHandler);

router.get('/user', userHandler);

router.put('/user/:id', [
  check('id', 'No es un id válido.').isUUID(),
  check('id').custom( userIdExists ),
  check('rol').custom( isRoleValid ),
  validarCampos
], updateUserHandler);

router.delete('/user/:id', [
  validarJWT,
  check('id', 'No es un id válido.').isUUID(),
  check('id').custom( userIdExists ),
  validarCampos
], deleteUserHandler);



module.exports = router;
