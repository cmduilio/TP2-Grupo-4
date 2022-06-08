const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');

describe('Add Pet', () => {

    it('returns 201 if pet is saved', (done)=> {
        
        axios({
            method: "post",
            url: 'http://localhost:8001/pets',
            data: {
                animal: "otro",
                race: "canario",
                name: "tilin",
                size: "chico",
                age: 2,
                looksForOwner: true,
                isVaccinated: false,
                isCastrated: true,
                comment: "come poco",
                userId: 11
            }
        }).then(response => {
            // testeo
            assert.equal(response.status, 201);
            done();
        }).catch(err => {
            done();
        })
    });

    it('returns 422 if vaccination is required', (done)=> {
        
        axios({
            method: "post",
            url: 'http://localhost:8001/pets',
            data: {
                animal: "perro",
                race: "no aplica",
                name: "roco",
                size: "grande",
                age: 4,
                looksForOwner: true,
                isVaccinated: false,
                isCastrated: true,
                comment: "come mucho",
                userId: 4
            }
        }).catch(err => {
            assert.equal(err.response.status, 422);
            done();
        })
    });

    it('returns 422 if neutering is required', (done)=> {
        
        axios({
            method: "post",
            url: 'http://localhost:8001/pets',
            data: {
                animal: "perro",
                race: "no aplica",
                name: "roco",
                size: "grande",
                age: 4,
                looksForOwner: true,
                isVaccinated: false,
                isCastrated: false,
                comment: "come mucho",
                userId: 4
            }
        }).catch(err => {
            assert.equal(err.response.status, 422);
            done();
        })
    });

    it('returns 422 if pet already exists', (done)=> {
        
        axios({
            method: "post",
            url: 'http://localhost:8001/pets',
            data: {
                animal: "perro",
                race: "golden",
                name: "coco",
                size: "mediano",
                age: 11,
                looksForOwner: true,
                isVaccinated: true,
                isCastrated: true,
                comment: "juega",
                userId: 1
            }
        }).catch(err => {
            assert.equal(err.response.status, 422);
            done();
        })
    });
})

