const { Role, User } = require('../db');

const isRoleValid = async (rol = '')=>{
  const existeRol = await Role.findOne({where: {rol: rol}});
  if(!existeRol){
    throw new Error(`El rol ${rol} no está registrado en la db.`)
  }
  return true;
};

const emailExists = async (email = '') =>{
  const existingUser = await User.findOne({where: {email: email}});
  if(existingUser){
    throw new Error(`El correo ${email} ya está registrado.`);
  }
}

module.exports = {
  isRoleValid,
  emailExists
}