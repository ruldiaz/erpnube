const { response } = require('express');
const bcryptjs = require('bcryptjs');
const {User} = require('../db');
const { generarJWT } = require('../helpers/generarJWT,js');

const loginHandler = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // verify if email exists
    const usuario = await User.findOne({where:{email: email}});
    if(!usuario){
      return res.status(400).json({
        msg: 'Usuario / contraseña no son correctos. - email'
      });
    }

    // verify if user is active
    if(!usuario.active){
      return res.status(400).json({
        msg: 'Usuario / contraseña no son correctos. - not active.'
      });
    }
    
    // verify password
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if(!validPassword){
      return res.status(400).json({
        msg: 'Usuario / contraseña no son correctos. - password'
      });
    }

    // generate JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token
    });  
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Habla con el administrador.'
    });
  }
  
}

module.exports = {
  loginHandler
}