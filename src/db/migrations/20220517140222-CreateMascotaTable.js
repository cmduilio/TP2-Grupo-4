'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('mascotas', { 
      
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
      },

      updateAt: {
        type: Sequelize.DataTypes.DATE,
      }
    });

  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.dropTable('mascotas');
     
  }
};
