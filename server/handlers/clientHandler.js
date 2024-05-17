const { Client } = require('../db');

// create client handler
const postClientHandler = ('/', async (req, res) => {
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

    let clientCreated = await Client.create({
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

    res.status(201).send(clientCreated);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// get all clients handler
const getClientHandler = ('/', async (req, res)=>{
  try {
    const allClients = await Client.findAll();
    res.status(200).send(allClients);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// update client Handler
const updateClientHandler = (async (req, res)=>{
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

      // update client handler
      const updatedClient = await Client.update({
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
      res.status(200).send(updatedClient[1][0]);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      error: error.message
    });
  }
});

//delete client handler
const deleteClientHandler = (async (req, res)=>{
  try {
    const id = req.params.id;
    console.log(id);
    await Client.destroy({where: {id:id}});
    res.status(200).json({message: 'Client deleted.'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = {postClientHandler, getClientHandler, updateClientHandler, deleteClientHandler};