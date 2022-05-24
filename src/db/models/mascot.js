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
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    especie: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    raza: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    tamanio: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    buscaDuenio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    estaVacunado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    estaCastrado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    comentario: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    updateAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Mascot',
  });
  return Mascot;
};