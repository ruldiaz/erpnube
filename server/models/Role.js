const { DataTypes } = require("sequelize");


const Role = (sequelize) => {
  sequelize.define(
    "role", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
    },
    { timestamps: false,
    }
  );
};


module.exports = Role;


