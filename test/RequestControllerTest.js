const axios = require('axios');
const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);

const { assert } = chai;

describe('Request', () => {
    it('returns all requests', (done) =>{
        axios({
            method: 'get',
            url: 'http://localhost:8001/requests',
        })
        .then(data => {
            assert.isTrue(data.data.length > 0)
            done();
        });
    });

    it('returns request with id', (done) =>{
        axios({
            method: 'get',
            url: 'http://localhost:8001/requests/30',
        })
        .then(data => {
            assert.equal(data.data.id, 30)
            done();
        });
    });

    it('return error with unknown id', (done) =>{
        axios({
            method: 'get',
            url: 'http://localhost:8001/requests/4000',
        })
        .catch(error => {
            assert.equal(error.response.data.message, `error getting request with id 4000`)
            done();
        });
    });

    it('return error creating request', (done) =>{
        axios({
            method: 'post',
            url: 'http://localhost:8001/requests',
            data: {
                id : 30
            }
        })
        .catch(error => {
            assert.equal(error.response.data.message, `Error creating request`)
            done();
        });
    });

    it('return created request', (done) =>{
        axios({
            method: 'post',
            url: 'http://localhost:8001/requests',
            data: {
                idOwner: 1,
                idMascot: 1,
                idRequester: 2,
                status: "open"
            }
        })
        .then(data => {
            assert.isTrue(data.data.id !== undefined)
            done();
        });
    });

    it('returns top 3 pets', (done) =>{
        axios({
            method: 'get',
            url: 'http://localhost:8001/requests-count-best',
        })
        .then(data => {
            assert.isTrue(data.data.length > 0)
            done();
        });
    });

    it('returns worst 3 pets', (done) =>{
        axios({
            method: 'get',
            url: 'http://localhost:8001/requests-count-worst',
        })
        .then(data => {
            assert.isTrue(data.data.length > 0)
            done();
        });
    });
});