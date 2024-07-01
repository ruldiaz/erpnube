const { Supplier } = require('../db');

// create supplier handler
const postSupplierHandler = ('/', async (req, res) => {
  console.log(req.body);
  try {
    let {
      razon_social,
      pais,
      estado,
      municipio,
      localidad,
      calle, 
      colonia,
      codigo_postal,
      numero_exterior,
      numero_interior,
      rfc
    } = req.body;

    let supplierCreated = await Supplier.create({
      razon_social,
      pais,
      estado,
      municipio,
      localidad,
      calle, 
      colonia,
      codigo_postal,
      numero_exterior,
      numero_interior,
      rfc
    });

    res.status(201).send(supplierCreated);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// get all suppliers handler
const getSupplierHandler = ('/', async (req, res)=>{
  try {
    const allSuppliers = await Supplier.findAll();
    res.status(200).send(allSuppliers);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// update supplier Handler
const updateSupplierHandler = (async (req, res)=>{
  try {
    console.log(req.body);
    const {id} = req.params;
    const {      razon_social,
      pais,
      estado,
      municipio,
      localidad,
      calle, 
      colonia,
      codigo_postal,
      numero_exterior,
      numero_interior,
      rfc} = req.body;

      // update supplier handler
      const updatedSupplier = await Supplier.update({
        razon_social,
        pais,
        estado,
        municipio,
        localidad,
        calle, 
        colonia,
        codigo_postal,
        numero_exterior,
        numero_interior,
        rfc
      }, {where: {id: id}, returning: true});
      res.status(200).send(updatedSupplier[1][0]);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      error: error.message
    });
  }
});

//delete supplier handler
const deleteSupplierHandler = (async (req, res)=>{
  try {
    const id = req.params.id;
    console.log(id);
    await Supplier.destroy({where: {id:id}});
    res.status(200).json({message: 'Supplier deleted.'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = {postSupplierHandler, getSupplierHandler, updateSupplierHandler, deleteSupplierHandler};