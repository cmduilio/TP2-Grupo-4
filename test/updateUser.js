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


    it('returns 400 if update the ID attribute is fail', (done)=> {
        const userid = 3;    
        const user = {
                id: -userid,
        };

        axios({
            method: "patch",
            ///!!! Pendiente de cambio: "/users/:id"
            url: `http://localhost:6001/users/${userid}/updateuser`,
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
        const userid = 4    
        const user = {};

        axios({
            method: "patch",
            ///!!! Pendiente de cambio: "/users/:id"
            url: `http://localhost:6001/users/${userid}/updateuser`,
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
        const userid = 5    
        const user = {
            name: "     ",
            lastName: "   ",
            email: "   \n  ",
            address: " \r\n ",
            requise: ""
        };

        axios({
            method: "patch",
            ///!!! Pendiente de cambio: "/users/:id"
            url: `http://localhost:6001/users/${userid}/updateuser`,
            data: user,
        }).then(response => {
            assert.equal(response.status, 400);   ///aqui solo llegas a recibir las respuestas 200 a 300
            done();
        }).catch(err => {
            if(Object.keys(err).includes("response"))   /// Si error contiene respuesta significa que viene directo del servidor y no del .then
            {
                assert.equal(err.response.status, 400); 
                done();
            }
            else done(err);  /// por aqui se despachan las respuestas que fueron 200 o 300
        }).catch(err => {
            done(err);
        })
    });


    const methods = ["get", "post", "put", "delete"];
    for(let f_method of methods){
        it(`returns 404 if update with ${f_method} methods fail`, (done)=> {
            const userid = 6    
            const user = {
                name: f_method
            };
                axios({
                    method: f_method,
                    ///!!! Pendiente de cambio: "/users/:id"
                    url: `http://localhost:6001/users/${userid}/updateuser`,
                    data: user,
                }).then(response => {
                    assert.equal(response.status, 404);
                    done();
                }).catch(err => {
                    if(Object.keys(err).includes("response")) 
                    {
                        assert.equal(err.response.status, 404); 
                        done();
                    }
                    else done(err);
                }).catch(err => {
                    done(err);
                })
            
        });
    }


})