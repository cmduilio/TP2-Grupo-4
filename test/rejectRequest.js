const chai = require('chai');
const axios = require('axios');
const { assert } = require('chai');
const { Request } = require('../src/db/models');
const {randNumber} = require('@ngneat/falso');

describe('Reject Request', () => {

    let ob1;
    let ob2;
    let ob3;
    let ob4;

    before(async function() {

        await Request.create({
            idOwner: 20,
            idMascot: randNumber({min: 1, max: 50}),
            idRequester: randNumber({min: 1, max: 50}),
            status: 'open',
            createdAt: new Date,
            updatedAt: new Date,
        }).then((x) => ob1 = x);

        await Request.create({
            idOwner: 1,
            idMascot: randNumber({min: 1, max: 50}),
            idRequester: randNumber({min: 1, max: 50}),
            status: 'open',
            createdAt: new Date,
            updatedAt: new Date,
        }).then((x) => ob2 = x);

        await Request.create({
            idOwner: 20,
            idMascot: randNumber({min: 1, max: 50}),
            idRequester: randNumber({min: 1, max: 50}),
            status: 'rejected',
            createdAt: new Date,
            updatedAt: new Date,
        }).then((x) => ob3 = x);

        await Request.create({
            idOwner: 20,
            idMascot: randNumber({min: 1, max: 50}),
            idRequester: randNumber({min: 1, max: 50}),
            status: 'accepted',
            createdAt: new Date,
            updatedAt: new Date,
        }).then((x) => ob4 = x);
    });

    it('returns 200 if request is rejected correctly', (done)=> {

         axios({
             method: "patch",
             url: 'http://localhost:8001/reject-request',
             data: {
                requestId: ob1.id
             }
             
         }).then(response => {
             assert.equal(response.status, 200);
             done();
         }).catch(err => {
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
            requestId: ob2.id
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
            requestId: ob3.id
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
            requestId: ob4.id
            }
            
        }).then(response => {
            done();
        }).catch(err => {
            assert.equal(err.response.status, 400);
            done();
        })
    });
    
});