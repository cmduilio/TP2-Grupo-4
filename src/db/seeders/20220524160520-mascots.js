'use strict';

const {randBetweenDate, randBird, randDog, randCat, randFirstName, randBoolean, randNumber, randText} = require('@ngneat/falso');

module.exports = {
  async up (queryInterface, Sequelize) {
    let mascots = [];

    for(let i = 0; i < 30; i++){
      mascots.push({
        animal: "perro",
        race: randDog(),
        name: randFirstName(),
        size: "grande",
        age: randNumber({min: 0, max: 10}),
        looksForOwner: randBoolean(),
        isVaccinated: randBoolean(),
        isCastrated: randBoolean(),
        comment: randText(),
        createdAt: randBetweenDate({from: new Date('01/01/2012'), to: new Date('01/01/2015')}),
        updatedAt: randBetweenDate({from: new Date('10/07/2015'), to: new Date('01/01/2021')})
      });
    }

    for(let i = 0; i < 30; i++){
      mascots.push({
        animal: "gato",
        race: randCat(),
        name: randFirstName(),
        size: "mediano",
        age: randNumber({min: 0, max: 10}),
        looksForOwner: randBoolean(),
        isVaccinated: randBoolean(),
        isCastrated: randBoolean(),
        comment: randText(),
        createdAt: randBetweenDate({from: new Date('01/01/2012'), to: new Date('01/01/2015')}),
        updatedAt: randBetweenDate({from: new Date('10/07/2015'), to: new Date('01/01/2021')})
      });
    }

    for(let i = 0; i < 10; i++){
      mascots.push({
        animal: "otro",
        race: randBird(),
        name: randFirstName(),
        size: "chico",
        age: randNumber({min: 0, max: 10}),
        looksForOwner: randBoolean(),
        isVaccinated: randBoolean(),
        isCastrated: randBoolean(),
        comment: randText(),
        createdAt: randBetweenDate({from: new Date('01/01/2012'), to: new Date('01/01/2015')}),
        updatedAt: randBetweenDate({from: new Date('10/07/2015'), to: new Date('01/01/2021')})
      });
    }

    await queryInterface.bulkInsert('mascots', mascots, {});

  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('mascots', null, {});

  }
};
