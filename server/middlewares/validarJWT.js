const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const {User} = require('../db');

const validarJWT = async (req, res = response, next)=> {

  const token = req.header('x-token');

  if(!token){
    return res.status(401).json({
      msg: 'No hay token en la petición.'
    });
  }
    
  try {
    const {id} = jwt.verify(token, process.env.JWT_SECRET);
    const usuarioAutenticado = await User.findOne({where:{id}});

    //verify if user exists
    if(!usuarioAutenticado){
      return res.status(401).json({
        msg: 'Token no válido - usuario no existe.'
      });
    }

    //verify if user is active
    if(!usuarioAutenticado.active){
      return res.status(401).json({
        msg: 'Token no válido - usuario con estado inactivo.'
      });
    }
    req.usuario = usuarioAutenticado;
    
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