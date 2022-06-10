const chai = require('chai');
const axios = require('axios');
const { assert } = require('chai');

describe('Reject Request', () => {

    it('returns 200 if request is rejected correctly', (done)=> {

         axios({
             method: "patch",
             url: 'http://localhost:8001/reject-request',
             data: {
                requestId: 1000
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
            method: "patch",
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
            method: "patch",
            url: 'http://localhost:8001/reject-request',
            data: {
            requestId: 1001
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
            method: "patch",
            url: 'http://localhost:8001/reject-request',
            data: {
            requestId: 1002
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
            method: "patch",
            url: 'http://localhost:8001/reject-request',
            data: {
            requestId: 1003
            }
            
        }).then(response => {
            done();
        }).catch(err => {
            assert.equal(err.response.status, 400);
            done();
        })
    });
    
});