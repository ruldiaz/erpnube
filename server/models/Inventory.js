const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Inventory', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    ProductNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    unidad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    inventario_actual: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    inventario_minimo: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    inventario_maximo: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    visible: {
      type: DataTypes. STRING,
      allowNull: true,
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ProductId: {  // Foreign key reference
      type: DataTypes.UUID,
      allowNull: false,
    },
  },{
    timestamps: false
  });
};