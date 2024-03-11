const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    costo: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      unique: false
    },
    iva: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.16,
    },
    unidad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },{
    timestamps: false
  });
};
