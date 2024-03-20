const { response } = require("express")

const isAdminRole = (req, res = response, next)=> {

  if(!req.usuario){
    return res.status(500).json({
      msg: 'Se quiere verificar el rol sin validar el token primero.'
    });
  }
  //console.log(req.usuario);
  const { rol, username } = req.usuario;
  if(rol !== 'admin'){
    return res.status(401).json({
      msg: `${username} no es admin, permiso denegado.`
    });
  }
  next();
}

module.exports = {
  isAdminRole
}