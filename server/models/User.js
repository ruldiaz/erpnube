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
        unique: true,
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
        defaultValue: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      firstLogin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      googleImage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: undefined,
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    { timestamps: false,
    }
  );
};


module.exports = User;


