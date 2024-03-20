const jwt = require('jsonwebtoken');

const generarJWT = ( id = '' )=> {
  return new Promise((resolve, reject)=>{
    const payload = { id };
    //console.log({payload});
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '4h'
    }, ( err, token ) => {
      if(err){
        console.error(err);
        reject('No se pudo generar el token.')
      }else{
        resolve(token);
      }
    });
  });
};

module.exports = {
  generarJWT
}