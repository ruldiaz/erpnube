const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('PurchaseProduct', {
    idPurchaseProduct: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    purchasedQuantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};
