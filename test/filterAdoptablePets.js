const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');
const { randDog } = require('@ngneat/falso');


let urlGlobal = `http://localhost:8001/view/adoptable/`;

describe('Search adoptable pets with filters', () => {

    it('returns 200 if get the view with empty filter is successfully', (done) => {

        axios({
            method: "get",
            url: urlGlobal,
            
        }).then(response => {
            assert.equal(response.status, 200);
            done();
        }).catch(err => {
            done(err);
        });
    });

    it('returns 200 if get view of the pets age equals 0 is succesfully', (done) => {

        axios({
            method: "get",
            url: `${urlGlobal}?age=0`,

        }).then(response => {
            assert.equal(response.status, 200);
            for(let pet of response.data){

                assert.equal(pet.age, 0)
            }
            done();
        }).catch(err => {
            done(err);
        });
    });

    it('returns 200 if get view of the pets with age range is succesfully', (done) => {
        let min = 5;
        let max = 7;
        axios({
            method: "get",
            url: `${urlGlobal}?age[0]=${min}&age[1]=${max}`,

        }).then(response => {
            assert.equal(response.status, 200);
            for(let pet of response.data){
                assert.isAtLeast(pet.age, min);
                assert.isAtMost(pet.age, max);
            }
            done();
        }).catch(err => {
            done(err);
        });
    });

    
    let race = randDog();
    it(`returns 200 if get view of the pets by race ${race} is succesfully`, (done) => {
        
        axios({
            method: "get",
            url: `${urlGlobal}?race=${race}`,

        }).then(response => {
            assert.equal(response.status, 200);
            for(let pet of response.data){
                assert.equal(pet.race, race);
            }
            done();
        }).catch(err => {
            done(err);
        });
    });

});