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
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    especie: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },

    raza: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },

    nombre: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },

    tamanio: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },

    edad: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },

    buscaDuenio: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },

    estaVacunado: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },

    estaCastrado: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },

    comentario: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },

    createdAt: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.DataTypes.NOW
    },

    updateAt: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Mascot',
  });
  return Mascot;
};