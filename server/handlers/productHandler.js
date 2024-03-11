const { getAllProducts } = require('../controllers/productController') ;
const { Product } = require('../db');

// create product handler
const postProductHandler = ('/', async (req, res)=>{
  console.log(req.body);
  try {
    let {
      titulo,
      codigo,
      costo,
      iva,
      unidad,
      precio
    } = req.body;

    let productCreated = await Product.create({
      titulo,
      codigo,
      costo,
      iva,
      unidad,
      precio
    });

    res.status(201).send(productCreated);

  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// read all products handler
const productHandler = ('/', async (req, res)=>{
  try {
    const allProducts = await getAllProducts();
    res.status(200).send(allProducts);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// update product handler
const updateProductHandler = (async (req, res) => {
  try {
    console.log(req.body)
    const {id} = req.params;
    const {titulo, codigo, costo, iva, unidad, precio} = req.body;

    const updatedProduct = await Product.update({
        titulo, codigo, costo, iva, unidad, precio   
    },  {where: {id: id}, returning: true} );
    

    res.status(200).send(updatedProduct[1][0]);

} catch (error) {
    console.error(error);
    res.status(404).json({error: error.message})
}
});

// delete product handler
const deleteProductHandler = (async (req, res)=>{
  try {
    const id = req.params.id;
    console.log(id);
    await Product.destroy({where: {id: id}});
    res.status(200).json({message: 'Producto borrado.'})

  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = {productHandler, postProductHandler, deleteProductHandler, updateProductHandler};