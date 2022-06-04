const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);

const { assert } = chai;

describe('Request', () => {
    it('return something', (done) =>{
        axios({
            method: 'get',
            url: 'http://localhost:6001/requests',
        })
        .then(data => {
            console.log("bien");
            console.log(data.body);
            done();
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'pep')
            done();
        });
    });
});