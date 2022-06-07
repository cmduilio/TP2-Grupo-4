'use strict';
const {randNumber} = require('@ngneat/falso') 

module.exports = {
  async up (queryInterface, Sequelize) {
    let requests = [];

    for (var i = 0; i < 1000; ++i)
    {
      requests.push({
        idOwner: randNumber({min: 1, max: 50}),
        idMascot: randNumber({min: 1, max: 50}),
        idRequester: randNumber({min: 1, max: 50}),
        status: 'open',
        createdAt: new Date,
        updatedAt: new Date,
      })
    }

    await queryInterface.bulkInsert('requests', requests, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('requests', null, {});
  }
};
