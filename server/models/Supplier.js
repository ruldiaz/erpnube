const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('supplier', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    razon_social: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    pais: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "XAXX010101000",
      unique: false
    },
    municipio: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    localidad: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    calle: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    colonia: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    codigo_postal: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    numero_exterior: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    numero_interior: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    rfc: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  },{
    timestamps: false
  });
};
