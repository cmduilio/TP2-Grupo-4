'use strict';

const { randFirstName, randLastName, randNumber,
  randEmail, randPassword, randUserName,
  randStreetAddress, randText, randBetweenDate } = require('@ngneat/falso')


module.exports = {
  async up(queryInterface, Sequelize) {

    let usuarios = []

    for (var i = 0; i < 50; i++) {

        usuarios.push({
          userName : randUserName(),
    
          password : randPassword(),
      
          name : randFirstName(),
      
          lastName : randLastName(),
      
          email : randEmail(),
      
          address : randStreetAddress(),
      
          phoneNumber : randNumber({min: 10000000, max: 99999999}),
      
          requise : randText(),
    
          createdAt: randBetweenDate({from: new Date('01/01/2012'), to: new Date('01/01/2015')}),
    
          updatedAt: randBetweenDate({from: new Date('10/07/2015'), to: new Date('01/01/2021')})
        });

    }

    await queryInterface.bulkInsert('users', usuarios, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
