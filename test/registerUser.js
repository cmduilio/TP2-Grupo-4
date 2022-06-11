const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');
const {randBetweenDate, randStreetAddress, randEmail, 
      randUserName, randFirstName, randLastName, randPassword, 
      randNumber, randText} = require('@ngneat/falso');


describe('User registered', () => {


    //si se creo exitosamente

    it('returns 201 if the user successfully registered', (done)=> {
           
        const body ={ 
          userName : randUserName(),
          password : randPassword(),
          name : randFirstName(),
          lastName : randLastName(),
          email : randEmail(),
          address : randStreetAddress(),
          phoneNumber : randNumber({min: 10000000, max: 90000000}), 
          requise : randText(),
        };  

         axios({
             method: "post",
             url: `http://localhost:8001/user`,
             data: body
             
         }).then(response => {
             assert.equal(response.status, 201);
             done();
         }).catch(err => {
             done(err);
         })
 });







})