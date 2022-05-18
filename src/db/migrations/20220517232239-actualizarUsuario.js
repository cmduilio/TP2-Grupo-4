'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuario', {

      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      nombre: {
        type : Sequelize.DataTypes.STRING(50),
        allowNull: false

      },

      apellido: {
        type : Sequelize.DataTypes.STRING(50),
        allowNull: false

      }
    }
    
    )},

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuario'); 
  }

}