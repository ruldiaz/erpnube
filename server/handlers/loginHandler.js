const { response } = require('express');
const bcryptjs = require('bcryptjs');
const {User} = require('../db');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/googleVerify');



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

const googleSignInHandler = async (req, res = response) => {
  const { google_token } = req.body;

  try {
    const googleUser = await googleVerify(google_token);
    console.log(googleUser);
    const { email, name, picture } = googleUser;

    let usuario = await User.findOne({where:{email: email}});

    // if usuario no existe crearlo con datos de google
    if(!usuario){
      const data = {
        username: name, 
        email: email,
        password: ":P",
        picture,
        google: true
      };

      usuario = await User.create( data );
    }

    if(!usuario.active){
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado.'
      });
    }

    // generate JWT
    const token = await generarJWT(usuario.id);

    // if usuario ya existe con datos de google entonces todo bien
    res.json({
      msg: 'Todo bien!',
      google_token,
      googleUser
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'El token no pudo ser verificado.'
    })
  }


}

module.exports = {
  loginHandler,
  googleSignInHandler
}