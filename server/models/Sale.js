const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('sale', {
    sale_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: false,
    },
    folio: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    metodo_pago: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "XAXX010101000",
      unique: false
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      unique: false,
    },
  },{
    timestamps: false
  });
};
