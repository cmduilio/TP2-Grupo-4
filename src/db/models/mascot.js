'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mascot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mascot.init({ 
      
    id: {
      type: sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    especie: {
      type: sequelize.DataTypes.STRING,
      allowNull: false,
    },

    raza: {
      type: sequelize.DataTypes.STRING,
      allowNull: false,
    },

    nombre: {
      type: sequelize.DataTypes.STRING,
      allowNull: false,
    },

    tamanio: {
      type: sequelize.DataTypes.STRING,
      allowNull: false,
    },

    edad: {
      type: sequelize.DataTypes.INTEGER,
      allowNull: false,
    },

    buscaDuenio: {
      type: sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },

    estaVacunado: {
      type: sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },

    estaCastrado: {
      type: sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },

    comentario: {
      type: sequelize.DataTypes.STRING,
      allowNull: true,
    },

    createdAt: {
      type: sequelize.DataTypes.DATE,
      defaultValue: sequelize.DataTypes.NOW
    },

    updateAt: {
      type: sequelize.DataTypes.DATE,
      defaultValue: sequelize.DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Mascot',
  });
  return Mascot;
};