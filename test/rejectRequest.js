const chai = require('chai');
const axios = require('axios');
const { assert } = require('chai');

describe('Reject Request', () => {

    it('returns 200 if request is rejected correctly', (done)=> {

         axios({
             method: "put",
             url: 'http://localhost:8001/reject-request',
             data: {
                requestId: 5
             }
             
         }).then(response => {
             assert.equal(response.status, 200);
             done();
         }).catch(err => {
            console.log(err);
            done(err);
         })
    });

    it('returns 400 if request is not found', (done)=> {

        axios({
            method: "put",
            url: 'http://localhost:8001/reject-request',
            data: {
               requestId: 0
            }
            
        }).then(response => {
            done();
        }).catch(err => {
            assert.equal(err.response.status, 400);
            done();
        })
   });

   it('returns 400 if request does not belong to user', (done)=> {

        axios({
            method: "put",
            url: 'http://localhost:8001/reject-request',
            data: {
            requestId: 6
            }
            
        }).then(response => {
            done();
        }).catch(err => {
            assert.equal(err.response.status, 400);
            done();
        })
    });

    it('returns 400 if request is already rejected', (done)=> {

        axios({
            method: "put",
            url: 'http://localhost:8001/reject-request',
            data: {
            requestId: 7
            }
            
        }).then(response => {
            done();
        }).catch(err => {
            assert.equal(err.response.status, 400);
            done();
        })
    });

    it('returns 400 if request is already accepted', (done)=> {

        axios({
            method: "put",
            url: 'http://localhost:8001/reject-request',
            data: {
            requestId: 8
            }
            
        }).then(response => {
            done();
        }).catch(err => {
            assert.equal(err.response.status, 400);
            done();
        })
    });
    
});