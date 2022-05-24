'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('mascots', { 
      
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      species: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },

      race: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },

      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },

      size: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },

      age: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },

      looksForOwner: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },

      isVaccinated: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },

      isCastrated: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },

      comment: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },

      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      },

      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      }
    });

  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.dropTable('mascots');
     
  }
};
