'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here  
    Request.belongsTo(models.Pet, {foreignKey : "idMascot"});
    }
  }
  Request.init({ 
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idOwner: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idMascot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idRequester: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('open', 'rejected', 'accepted'),
      defaultValue: 'open',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};