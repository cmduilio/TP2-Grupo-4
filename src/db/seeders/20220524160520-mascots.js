'use strict';

const {randAnimalType, randFirstName, randBoolean, randNumber, randText} = require('@ngneat/falso');

module.exports = {
  async up (queryInterface, Sequelize) {
    let mascots = [];

    for(let i = 0; i < 100; i++){
      mascots.push({
        especie: "animal",
        raza: randAnimalType(),
        nombre: randFirstName(),
        tamanio: "mediano",
        edad: randNumber({min: 0, max: 10}),
        buscaDuenio: randBoolean(),
        estaVacunado: randBoolean(),
        estaCastrado: randBoolean(),
        comentario: randText(),
        createdAt: new Date,
        updatedAt: new Date,
      });
    }

    await queryInterface.bulkInsert('mascots', mascots, {});

  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('mascots', null, {});

  }
};
