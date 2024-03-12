const { Router } = require('express');
// Importar todos los routers;
const { productHandler, postProductHandler, deleteProductHandler, updateProductHandler } = require('../handlers/productHandler');
const { postUserHandler, userHandler, updateUserHandler, deleteUserHandler } = require('../handlers/userHandler');
const { check } = require('express-validator');


const router = Router();

// Product routes

router.post('/product', postProductHandler);

router.get('/products', productHandler);

router.put('/product/:id', updateProductHandler);

router.delete('/product/:id', deleteProductHandler);


// User routes

router.post('/user', [
  check('email', 'Correo no válido').isEmail(),
] ,postUserHandler);

router.get('/user', userHandler);

router.put('/user/:id', updateUserHandler);

router.delete('/user/:id', deleteUserHandler);

module.exports = router;
