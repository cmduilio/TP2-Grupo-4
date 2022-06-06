const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');


describe('Update user', () => {

    it('returns 201 if update all attributes is succesful', (done)=> {
        
        const userid = 1;
        const user = {
                name: "rinas",
                lastName: "grande",
                email: "grandemuygrande@gmail.com",
                address: "asdas 2x",
                phoneNumber: 1234,
                requise: "asda",
        };

        
        axios({
            method: "patch",
            ///!!! Pendiente de cambio: "/users/:id"
            url: `http://localhost:6001/users/${userid}/updateuser`,
            data: user
            
        }).then(response => {
            assert.equal(response.status, 201);
            done();
        }).catch(err => {
            done(err);
        })
    });


    it('returns 201 if update one attribute is succesful', (done)=> {
        
        const userid = 2;
        const user = {
                name: "Carlito",
        };

        axios({
            method: "patch",
            ///!!! Pendiente de cambio: "/users/:id"
            url: `http://localhost:6001/users/${userid}/updateuser`,
            data: user,
            
        }).then(response => {
            assert.equal(response.status, 201);
            done();
        }).catch(err => {
            done(err);
        })
    });




})