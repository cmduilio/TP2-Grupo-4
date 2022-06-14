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
            if(!err.response)  done(err);
            else{
                assert.equal(err.response.status, 400);
                done();
            }
        })
        .catch(err => {
            done(err);
        })
    });


    it('returns 200 when showing total count of requests related to animal ', (done)=> {
        
        const idAnimal = randNumber({min: 1, max: 50});   

        axios({
            method: "get",
            url: `http://localhost:8001/pets/totalrequestsbypet/${idAnimal}`,
        }).then(response => {
            assert.equal(response.status, 200);
            done();
        }).catch(err => {
            done();
        })
    });


    it('returns 400 when if the animal not looking for owner', (done)=> {
        
        const idAnimal = randNumber({min: 1, max: 50});   

        axios({
            method: "get",
            url: `http://localhost:8001/pets/totalrequestsbypet/${idAnimal}`,
        }).then(response => {
            assert.equal(response.status, 200);
            done();
        }).catch(err => {
            if(!err.response)  done(err);
            else{
                assert.equal(err.response.status, 400);
                done();
            }
        })
        .catch(err => {
            done(err);
        })
    });


    const methods = ["post", "patch", "put", "delete"];
    for(let f_method of methods){
        it(`returns 4xx if update with ${f_method} methods fail`, (done)=> {
            const idAnimal = randNumber({min: 1, max: 50});    
            const user = {
                name: f_method
            };
                axios({
                    method: f_method,
                    url: `http://localhost:8001/view-requests-by-animal/${idAnimal}`,
                    data: user,
                }).then(response => {
                    assert.equal(response.status, 404);
                }).catch(err => {
                    if(!err.response) throw err;
                    assert.equal(err.response.status, 404);
                    done();
                }).catch(err => {
                    done(err);
                })   
        });
    }

})