const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');
const { randNumber } = require('@ngneat/falso');

describe('Request by animal', () => {

    it('returns 400 when this id is invalid', (done)=> {
        
        const idAnimal = randNumber({min: 1, max: 50});

        axios({
            method: "get",
            url: `http://localhost:8001/pets/totalrequestsbypet/${-idAnimal}`,
        }).then(response => {
            assert.equal(response.status, 400);
        }).catch(err => {
            done();
        })
    });


    it('returns 200 when showing total count of requests related to animal ', (done)=> {
        
        const idAnimal = randNumber({min: 1, max: 50});   

        axios({
            method: "get",
            url: `http://localhost:8001/pets/totalrequestsbypet/${idAnimal}`,
        }).then(response => {
            assert.equal(response.status, 200);
        }).catch(err => {
            done();
        })
    });


})