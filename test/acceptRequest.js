const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');


describe('Accept Request', () => {
    /// Antes de ejecutar el test usar 
    /// update proyectoadopcion.requests set status="open" where id>0 and id<10;

    it('returns 201 if request is accepted', (done)=> {
           
        const requestId = 7;   // deberia ser dinamico
        const body ={ requestKey: 619+673 };  

         axios({
             method: "put",
             url: `http://localhost:6001/accept-request/${requestId}`,
             data: body
             
         }).then(response => {
             assert.equal(response.status, 201);
             done();
         }).catch(err => {
             done(err);
         })
 });



})
