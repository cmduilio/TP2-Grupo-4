const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');


describe('Update user', () => {

    it('returns 201 if update is succesful', (done)=> {
        
        axios({
            method: "patch",
            url: 'http://localhost:6001/users',
            data: {
                userName: "perro",
                password: "no aplica",
                name: "rin",
                lastName: "grande",
                email: "cacapi@gmail.com",
                address: "asdas 2x",
                phoneNumber: "asda",
                requise: "asda",
            }
        }).then(response => {
            // testeo
            assert.equal(response.status, 201);
            done();
        }).catch(err => {
            done();
        })
    });
})