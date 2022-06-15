const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');
const { randBetweenDate, randStreetAddress, randEmail,
    randUserName, randFirstName, randLastName, randPassword,
    randNumber, randText } = require('@ngneat/falso');


describe('Update user', () => {

    it('returns 201 if update all attributes is succesful', (done)=> {
        
        const userid = randNumber({min: 1, max: 50});
        const user = {
            name : randFirstName(),
            lastName : randLastName(),
            email : randEmail(),
            address : randStreetAddress(),
            phoneNumber : randNumber({min: 10000000, max: 99999999}),
            requise : randText(),
        };
        
        axios({
            method: "patch",
            url: `http://localhost:8001/users/${userid}`,
            data: user
            
        }).then(response => {
            assert.equal(response.status, 201);
            done();
        }).catch(err => { console.error(err)
            done(err);
        })
    });


    it('returns 201 if update one attribute is succesful', (done)=> {
        
        const userid = randNumber({min: 1, max: 50});
        const user = {
                name : randUserName(),
        };

        axios({
            method: "patch",
            url: `http://localhost:8001/users/${userid}`,
            data: user,
            
        }).then(response => {
            assert.equal(response.status, 201);
            done();
        }).catch(err => {
            done(err);
        })
    });


    it('returns 400 if update the ID attribute is fail', (done)=> {
        const userid = -randNumber({min: 1, max: 50});    
        const user = {
                id: -randNumber({min: 1, max: 50}),
        };

        axios({
            method: "patch",
            url: `http://localhost:8001/users/${userid}`,
            data: user,
        }).then(response => {
            assert.equal(response.status, 400);
            done();
        }).catch(err => {
            if(Object.keys(err).includes("response"))
            {
                assert.equal(err.response.status, 400); 
                done();
            }
            else done(err);
        }).catch(err => {
            done(err);
        })
    });


    it('returns 400 if update with empty body is fail', (done)=> {
        const userid = randNumber({min: 1, max: 50});   
        const user = {};

        axios({
            method: "patch",
            url: `http://localhost:8001/users/${userid}`,
            data: user,
        }).then(response => {
            assert.equal(response.status, 400);
            done();
        }).catch(err => {
            if(Object.keys(err).includes("response")) 
            {
                assert.equal(err.response.status, 400); 
                done();
            }
            else done(err);
        }).catch(err => {
            done(err);
        })
    });


    it('returns 400 if update with only empty attributes is fail', (done)=> {
        const userid = randNumber({min: 1, max: 50});    
        const user = {
            name: "     ",
            lastName: "   ",
            email: "   \n  ",
            address: " \r\n ",
            requise: ""
        };

        axios({
            method: "patch",
            url: `http://localhost:8001/users/${userid}`,
            data: user,
        }).then(response => {
            assert.equal(response.status, 400);
            done();
        }).catch(err => {
            if(Object.keys(err).includes("response"))
            {
                assert.equal(err.response.status, 400); 
                done();
            }
            else done(err);
        }).catch(err => {
            done(err);
        })
    });


    const methods = ["post", "put", "delete"];
    for(let f_method of methods){
        it(`returns 4xx if update with ${f_method} methods fail`, (done)=> {
            const userid = randNumber({min: 1, max: 50});    
            const user = {
                name: f_method
            };
                axios({
                    method: f_method,
                    url: `http://localhost:8001/users/${userid}`,
                    data: user,
                }).then(response => {
                    assert.isAtLeast(response.status, 400);
                    done();
                }).catch(err => {
                    if(Object.keys(err).includes("response")) 
                    {
                        assert.isAtLeast(err.response.status, 400); 
                        done();
                    }
                    else done(err);
                }).catch(err => {
                    done(err);
                })
            
        });
    }


})