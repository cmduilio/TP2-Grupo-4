const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');


describe('View adoptable pets', () => {


    it('returns 200 if view is get succesfull', (done)=> {
           
         axios({
             method: "get",
             url: `http://localhost:8001/pets/lookForOwner`,
             
         }).then(response => {
             assert.equal(response.status, 200);
             done();
         }).catch(err => {
             done(err);
         })
 });



const methods = ["put", "post", "patch", "delete"];
for(let f_method of methods){
    it(`returns 404 if not get the view with ${f_method}`, (done)=> {
        axios({
            method: f_method,
            url: `http://localhost:8001/pets/lookForOwner`,
         
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
