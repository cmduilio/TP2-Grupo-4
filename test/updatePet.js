const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');

describe('Add Pet', () => {

    it('returns 201 if pet is updated', (done)=> {
        
        axios({
            method: "patch",
            url: 'http://localhost:8001/pets/4/user/8',
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
            url: 'http://localhost:8001/pets/40/user/3',
            data: {
                animal: "perro",
            }
        }).catch(err => {
            assert.equal(err.response.status, 422);
            done();
        })
    });

    it('returns 422 if userId does not match pet userId', (done)=> {
        
        axios({
            method: "patch",
            url: 'http://localhost:8001/pets/1/user/2',
            data: {
                nombre: "robert",
            }
        }).catch(err => {
            assert.equal(err.response.status, 422);
            done();
        })
    });
})
