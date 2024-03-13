const { Router } = require('express');
// Importar todos los routers;
const { productHandler, postProductHandler, deleteProductHandler, updateProductHandler } = require('../handlers/productHandler');
const { postUserHandler, userHandler, updateUserHandler, deleteUserHandler } = require('../handlers/userHandler');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validations');

const router = Router();

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
  check('rol','Rol no válido').isIn(['admin','user']),
  validarCampos
] ,postUserHandler);

router.get('/user', userHandler);

router.put('/user/:id', updateUserHandler);

router.delete('/user/:id', deleteUserHandler);

module.exports = router;
