'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {

      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      userName: {
        type : Sequelize.DataTypes.STRING(50),
        allowNull: false

      },

      password: {
        type : Sequelize.DataTypes.STRING(50),
        allowNull: false

      },

      name: {
        type : Sequelize.DataTypes.STRING(50),
        allowNull: false

      },

      lastName: {
        type : Sequelize.DataTypes.STRING(50),
        allowNull: false

      },

      email: {
        type : Sequelize.DataTypes.STRING(50),
        allowNull: false

      },

      address: {
        type : Sequelize.DataTypes.STRING(50),
        allowNull: false

      },

      phoneNumber: {
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false

      },

      requise: {
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
    await queryInterface.dropTable('users'); 
  }

}