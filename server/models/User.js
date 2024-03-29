const { DataTypes } = require("sequelize");


const User = (sequelize) => {
  sequelize.define(
    "user", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          notEmpty: {
            msg: 'Username is required'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Email is required'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'The password is required'
          }
        }
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
      google: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      }
    },
    { timestamps: false,
    }
  );
};


module.exports = User;


