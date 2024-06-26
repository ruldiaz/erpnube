const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Purchase', {
    idPurchase: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    supplierId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
    timestamps: false,
  });
};
