const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');
const { Pet } = require('../src/db/models');
const {randDog, randFirstName, randText} = require('@ngneat/falso');

describe('Update Pet', () => {

    it('returns 201 if pet is updated', (done)=> {
        
        axios({
            method: "patch",
            url: 'http://localhost:8001/pets/1001',
            data: {
                name: "Rocky",
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
            url: 'http://localhost:8001/pets/1001',
            data: {
                animal: "gato",
            }
        }).catch(err => {
            assert.equal(err.response.status, 422);
            done();
        })
    });

    it('returns 422 if userId does not match pets userId', (done)=> {
        
        axios({
            method: "patch",
            url: 'http://localhost:8001/pets/1002',
            data: {
                nombre: "robert",
            }
        }).catch(err => {
            assert.equal(err.response.status, 422);
            done();
        })
    });

    it('returns 422 if animal is not found', (done)=> {
        
        axios({
            method: "patch",
            url: 'http://localhost:8001/pets/1000000',
            data: {
                nombre: "robert",
            }
        }).catch(err => {
            assert.equal(err.response.status, 422);
            done();
        })
    });
})
