const { response, request } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req, res = response, next)=> {

  const token = req.header('x-token');

  if(!token){
    return res.status(401).json({
      msg: 'No hay token en la petición.'
    });
  }
    
  try {
    const {id} = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log(id);
    next();  
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      msg: 'Token no válido.'
    })
  }
}

module.exports = {
  validarJWT
}