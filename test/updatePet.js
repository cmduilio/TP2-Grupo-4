const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');
const { Pet } = require('../src/db/models');
const {randDog, randFirstName, randText, randCat} = require('@ngneat/falso');

describe('Update Pet', () => {

    let ob1;
    let ob2;

    before(async function() {
        await Pet.create({
            animal: "perro",
            race: randDog(),
            name: randFirstName(),
            size: "mediano",
            age: 10,
            looksForOwner: true,
            isVaccinated: true,
            isCastrated: true,
            comment: "test",
            userId: 2,
        }).then( (x) => ob1 = x);

        await Pet.create({
            animal: "gato",
            race: randCat(),
            name: randFirstName(),
            size: "chico",
            age: 5,
            looksForOwner: true,
            isVaccinated: true,
            isCastrated: true,
            comment: "test",
            userId: 1,
        }).then( (x) => ob2 = x);
    })

    it('returns 201 if pet is updated', (done)=> {
        
        axios({
            method: "patch",
            url: `http://localhost:8001/pets/${ob1.id}`,
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
            url: `http://localhost:8001/pets/${ob1.id}`,
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
            url: `http://localhost:8001/pets/${ob2.id}`,
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
