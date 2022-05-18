'use strict';

const {randFirstName, randLastName, randNumber} = require('@ngneat/falso')


module.exports = {
  async up (queryInterface, Sequelize) {
    
    let usuarios = []

      for(var i = 0; i < 1000; i++){

        usuarios.push({
          userName : "Carlox",
    
          password : "1212",
      
          name : randFirstName(),
      
          lastName : randLastName(),
      
          email : "aaa@aaa",
      
          address : "Case 22",
      
          phoneNumber : "1231232",
      
          requise : "muchos",
    
          createdAt: new Date,
    
          updatedAt: new Date
        });

      }

      await queryInterface.bulkInsert('users', usuarios, {});

  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('users', null, {});

  }
};
