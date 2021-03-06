'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pet.belongsTo(models.User, {foreignKey : "userId"});
      Pet.hasMany(models.Request, {foreignKey : "idMascot"});
    }
  }
  Pet.init({ 
      
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    animal: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    race: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    looksForOwner: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    isVaccinated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    isCastrated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    userId: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
    
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};