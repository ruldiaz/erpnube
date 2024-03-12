const { validationResult } = require('express-validator');

const validarCampos = (req, res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json(errors);
  }
}

module.exports = {
  validarCampos
}