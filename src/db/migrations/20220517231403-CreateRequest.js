'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('solicitudes', { 
      
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      idOwner: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },

      idMascot: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },

      idRequester: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },

      status: {
        type: Sequelize.DataTypes.ENUM('open', 'rejected', 'accepted'),
        defaultValue: 'open',
      },

      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      },

      updateAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      },

      deletedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      }
    });

  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.dropTable('solicitudes');
     
  }
};
