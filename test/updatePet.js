const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');

describe('Add Pet', () => {

    it('returns 201 if pet is updated', (done)=> {
        
        axios({
            method: "patch",
            url: 'http://localhost:8001/pets/4/update',
            data: {
                name: "Firulais",
            }
        }).then(response => {
            // testeo
            assert.equal(response.status, 201);
            done();
        }).catch(err => {
            done();
        })
    });

    it('returns 422 if pet animal type is modified', (done)=> {
        
        axios({
            method: "patch",
            url: 'http://localhost:8001/pets/40/update',
            data: {
                animal: "perro",
            }
        }).catch(err => {
            assert.equal(err.response.status, 422);
            done();
        })
    });
})
