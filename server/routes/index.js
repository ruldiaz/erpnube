const { Router } = require('express');
// Importar todos los routers;
const { productHandler, postProductHandler, deleteProductHandler, updateProductHandler } = require('../handlers/productHandler');

// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post('/product', postProductHandler);

router.get('/products', productHandler);

router.put('/product/:id', updateProductHandler);

router.delete('/product/:id', deleteProductHandler);



module.exports = router;
