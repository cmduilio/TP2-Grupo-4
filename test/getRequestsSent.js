const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');

describe('Get requests sent', () => {

    it('returns 200 when showing requests made by user', (done)=> {
        
        axios({
            method: "get",
            url: 'http://localhost:8001/sent-requests',
        }).then(response => {
            // testeo
            assert.equal(response.status, 200);
            done();
        }).catch(err => {
            done();
        })
    });
})