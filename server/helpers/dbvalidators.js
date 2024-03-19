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
};

const userIdExists = async (id = '') =>{
  const existingUserById = await User.findByPk(id);
  if(!existingUserById){
    throw new Error(`El usuario con ${id} no está registrado.`);
  }
};

const userIsActive = async (email = '') => {
  const user = await User.findOne({where: {email: email}});
  if(user && !user.active){
    throw new Error(`Usuario con correo ${email} no está activo.`);
  }
}

module.exports = {
  isRoleValid,
  emailExists,
  userIdExists,
  userIsActive
}