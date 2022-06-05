const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);

const { assert } = chai;

describe('Request', () => {
    it('returns all requests', (done) =>{
        axios({
            method: 'get',
            url: 'http://localhost:6001/requests',
        })
        .then(data => {
            assert.isTrue(data.data.length > 0)
            done();
        });
    });

    it('returns request with id', (done) =>{
        axios({
            method: 'get',
            url: 'http://localhost:6001/requests/30',
        })
        .then(data => {
            assert.equal(data.data.id, 30)
            done();
        });
    });

    it('return error with unknown id', (done) =>{
        axios({
            method: 'get',
            url: 'http://localhost:6001/requests/4000',
        })
        .catch(error => {
            assert.equal(error.response.data.message, `error getting request with id 4000`)
            done();
        });
    });

    it('return error creating request', (done) =>{
        axios({
            method: 'post',
            url: 'http://localhost:6001/requests',
            data: {
                id : 30
            }
        })
        .catch(error => {
            assert.equal(error.response.data.message, `Error creating request`)
            done();
        });
    });

    //TODO DUILIO: por alguna razon esto devuelve error pero crea el objeto en base
    it.skip('return created request', (done) =>{
        axios({
            method: 'post',
            url: 'http://localhost:6001/requests',
            data: {
                idOwner: 1,
                idMascot: 1,
                idRequester: 2,
                status: "open"
            }
        })
        .then(data => {
            assert.isTrue(data.id)
            done();
        });
    });
});