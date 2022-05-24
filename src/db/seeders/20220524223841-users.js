'use strict';

const {randBetweenDate, randStreetAddress, randEmail, randUserName, randFirstName, randLastName, randPassword, randNumber, randText} = require('@ngneat/falso');

module.exports = {
  async up (queryInterface, Sequelize) {

    let usuarios = []

      for(var i = 0; i < 1000; i++){

        usuarios.push({
          userName : randUserName(),
    
          password : randPassword(),
      
          name : randFirstName(),
      
          lastName : randLastName(),
      
          email : randEmail(),
      
          address : randStreetAddress(),
      
          phoneNumber : randNumber({min: 10000000, max: 90000000}),
      
          requise : randText(),
    
          createdAt: randBetweenDate({from: new Date('01/01/2012'), to: new Date('01/01/2015')}),
    
          updatedAt: randBetweenDate({from: new Date('10/07/2015'), to: new Date('01/01/2021')})
        });

      }
 
    await queryInterface.bulkInsert('users', usuarios, {});
   
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('users', null, {});

  }
};
