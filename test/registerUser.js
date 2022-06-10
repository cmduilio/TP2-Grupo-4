const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');


describe('User registered', () => {


    //si se creo exitosamente

    it('returns 201 if the user successfully registered', (done)=> {
           
        const body ={ 
            userName : "xxcalirten22332",
            password : "marcala213012",
            name : "Carlitaso",
            lastName : "Miguelangeloush",
            email : "asssd@ualalala.com",
            address : "Palaca 22",
            phoneNumber : 1223123232,
            requise : "Alguna cosa"
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