'use strict';
const {
  Model, UniqueConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Pet, {foreignKey : "userId"});
      User.hasMany(models.Request, {foreignKey : "idRequester"});
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    userName: {
      type : DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },

    password: {
      type : DataTypes.STRING(50),
      allowNull: false

    },

    name: {
      type : DataTypes.STRING(50),
      allowNull: false

    },

    lastName: {
      type : DataTypes.STRING(50),
      allowNull: false

    },

    email: {
      type : DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },

    address: {
      type : DataTypes.STRING(50),
      allowNull: false

    },

    phoneNumber: {
      type : DataTypes.INTEGER,
      allowNull: false

    },

    requise: {
      type : DataTypes.STRING(200),
      allowNull: false

    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};