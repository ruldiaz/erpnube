const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Sale', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    clientId: {
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
