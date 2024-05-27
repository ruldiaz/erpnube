const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
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
    stock: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    timestamps: false,
    hooks: {
      afterCreate: async (product, options) => {
        const { Inventory } = sequelize.models;
        console.log('Creating Inventory for Product:', product.id); // Logging for debugging
        try {
          await Inventory.create({
            ProductId: product.id,
            inventario_actual: product.stock,
            codigo: product.codigo,
            titulo: product.titulo,
            unidad: product.unidad
          }, { transaction: options.transaction });
          console.log('Inventory created successfully'); // Logging for debugging
        } catch (error) {
          console.error('Failed to create Inventory:', error); // Logging for debugging
        }
      }
    }
  });

  return Product;
};
