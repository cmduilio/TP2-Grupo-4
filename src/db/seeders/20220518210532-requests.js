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

    //request for reject-request testing
    requests.push({
        id: 1000,  
        idOwner: 20,
        idMascot: randNumber({min: 1, max: 50}),
        idRequester: randNumber({min: 1, max: 50}),
        status: 'open',
        createdAt: new Date,
        updatedAt: new Date,
    },
    {
      id: 1001,
      idOwner: 1,
      idMascot: randNumber({min: 1, max: 50}),
      idRequester: randNumber({min: 1, max: 50}),
      status: 'open',
      createdAt: new Date,
      updatedAt: new Date,
    },
    {
      id: 1002,
      idOwner: 20,
      idMascot: randNumber({min: 1, max: 50}),
      idRequester: randNumber({min: 1, max: 50}),
      status: 'rejected',
      createdAt: new Date,
      updatedAt: new Date,
    },
    {
      id: 1003,
      idOwner: 20,
      idMascot: randNumber({min: 1, max: 50}),
      idRequester: randNumber({min: 1, max: 50}),
      status: 'accepted',
      createdAt: new Date,
      updatedAt: new Date,
    }
    )

    await queryInterface.bulkInsert('requests', requests, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('requests', null, {});
  }
};
