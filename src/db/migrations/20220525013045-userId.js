'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('pets', 'userId', {
      
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    });

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn('pets', 'userId');
  }
};
