'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuario', {

      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      nombreUsuario: {
        type : Sequelize.DataTypes.STRING(50),
        allowNull: false

      },

      contrasena: {
        type : Sequelize.DataTypes.STRING(50),
        allowNull: false

      },

      nombre: {
        type : Sequelize.DataTypes.STRING(50),
        allowNull: false

      },

      apellido: {
        type : Sequelize.DataTypes.STRING(50),
        allowNull: false

      },

      email: {
        type : Sequelize.DataTypes.STRING(50),
        allowNull: false

      },

      domicilio: {
        type : Sequelize.DataTypes.STRING(50),
        allowNull: false

      },

      telefono: {
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false

      },

      requisito: {
        type : Sequelize.DataTypes.STRING(200),
        allowNull: false

      },

      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue : Sequelize.DataTypes.NOW
      },

      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue : Sequelize.DataTypes.NOW
      }
    }
    
    )},

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuario'); 
  }

}