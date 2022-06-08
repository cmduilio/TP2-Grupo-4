'use strict';

const {randBetweenDate, randBird, randDog, randCat, randFirstName, randBoolean, randNumber, randText} = require('@ngneat/falso');

module.exports = {
  async up (queryInterface, Sequelize) {
    let pets = [];

    for(let i = 0; i < 30; i++){
      pets.push({
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
        updatedAt: randBetweenDate({from: new Date('10/07/2015'), to: new Date('01/01/2021')}),
        userId: randNumber({min: 1, max: 50}),
      });
    }

    for(let i = 0; i < 30; i++){
      pets.push({
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
        updatedAt: randBetweenDate({from: new Date('10/07/2015'), to: new Date('01/01/2021')}),
        userId: randNumber({min: 1, max: 50}),
      });
    }

    for(let i = 0; i < 10; i++){
      pets.push({
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
        updatedAt: randBetweenDate({from: new Date('10/07/2015'), to: new Date('01/01/2021')}),
        userId: randNumber({min: 1, max: 50}),
      });
    }

    pets.push({
      animal: "perro",
      race: "golden",
      name: "coco",
      size: "mediano",
      age: 11,
      looksForOwner: true,
      isVaccinated: true,
      isCastrated: true,
      comment: "juega",
      createdAt: randBetweenDate({from: new Date('01/01/2012'), to: new Date('01/01/2015')}),
      updatedAt: randBetweenDate({from: new Date('10/07/2015'), to: new Date('01/01/2021')}),
      userId: 1,
    })

    await queryInterface.bulkInsert('pets', pets, {});

  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('pets', null, {});

  }
};
