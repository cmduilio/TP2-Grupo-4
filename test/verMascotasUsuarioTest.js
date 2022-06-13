const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');

describe('View users pet', () => {

    it('returns 200 when showing users pets', (done)=> {
        
        axios({
            method: "get",
            url: 'http://localhost:8001/pets?userId=1',
        }).then(response => {
            // testeo
            assert.equal(response.status, 200);
            done();
        }).catch(err => {
            done();
        })
    });

    it('returns 422 if user is not found', (done)=> {
        
        axios({
            method: "get",
            url: 'http://localhost:8001/pets?userId=0',
        }).then(response => {
            // testeo
            done();
        }).catch(err => {
            assert.equal(err.response.status, 422);
            done();
        })
    });
})

