const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');



describe('Accept Request', async ()=> {
    let testRequest;

    it('returns 200 if request is generate', (done) => {
        axios({
            method: "get",
            url: `http://localhost:8001/test/request`
        }).then(response => {
            testRequest = response.data;
            assert.equal(response.status, 200);
            done();
        }).catch(err => {
            done(err);
        })
    });

    it('returns 201 if request is accepted', (done) => {
        axios({
            method: "patch",
            url: `http://localhost:8001/request/${testRequest.id}`,
            data: { requestKey: (testRequest.requestKey), status : "accepted" }
        }).then(response => {
            assert.equal(response.status, 201);
            done();
        }).catch(err => {
            done(err);
        })
    });

    it('returns 400 if can\'t reject the previusly accepted request', (done) => {
        axios({
            method: "patch",
            url: `http://localhost:8001/request/${testRequest.id}`,
            data: { requestKey: (testRequest.requestKey), status : "rejected" }
        }).then(response => {
            assert.equal(response.status, 400);
        }).catch(err => {
            if(!err.response) throw err;
            assert.equal(err.response.status, 400);
            done();
        }).catch(err => {
            done(err);
        })
    });

    it('returns 400 when request is already accepted or cancel', (done) => {

        axios({
            method: "patch",
            url: `http://localhost:8001/request/${testRequest.id}`,
            data: { requestKey: testRequest.requestKey, status : "accepted" }

        }).then(response => {
            assert.equal(response.status, 400);
        }).catch(err => {
            if(!err.response) throw err;
            assert.equal(err.response.status, 400);
            done();
        }).catch(err => {
            done(err);
        })
    });

    it('returns 400 if the update is cancel by bad Key', (done) => {

        axios({
            method: "patch",
            url: `http://localhost:8001/request/${testRequest.id}`,
            data: { requestKey: -testRequest.requestKey, status : "accepted" }

        }).then(response => {
            assert.equal(response.status, 400);
        }).catch(err => {
            if(!err.response) throw err;
            assert.equal(err.response.status, 400);
            done();
        }).catch(err => {
            done(err);
        })
    });


    it('returns 400 if the update is cancel by a empty body', (done) => {

        const requestId = Math.floor(Math.random());

        axios({
            method: "patch",
            url: `http://localhost:8001/request/${requestId}`,
        }).then(response => {
            assert.equal(response.status, 400);
        }).catch(err => {
            if(!err.response) throw err;
            assert.equal(err.response.status, 400);
            done();
        }).catch(err => {
            done(err);
        })
    });


    it('returns 400 if the update is cancel by a bad body', (done) => {

        const requestId = Math.floor(Math.random());

        axios({
            method: "patch",
            url: `http://localhost:8001/request/${requestId}`,
            data: {
                pana : "alegre",
                gene : "1010", status : "accepted"
            }

        }).then(response => {
            assert.equal(response.status, 400);
        }).catch(err => {
            if(!err.response) throw err;
            assert.equal(err.response.status, 400);
            done();
        }).catch(err => {
            done(err);
        })
    });

    it('returns 400 if request isn\'t exist', (done) => {

        const requestId = "A";
        const body = { requestKey:  34343 , status : "accepted"};

        axios({
            method: "patch",
            url: `http://localhost:8001/request/${requestId}`,
            data: body

        }).then(response => {
            assert.equal(response.status, 400);
        }).catch(err => {
            if(!err.response) throw err;
            assert.equal(err.response.status, 400);
            done();
        }).catch(err => {
            done(err);
        })
    });


    const methods = ["get", "post", "put", "delete"];
    for (let f_method of methods) {
        it(`returns 404 if accept with ${f_method} methods fail`, (done) => {

            const requestId = 0;
            const body = { requestKey: 0, status : "accepted" };

            axios({
                method: f_method,
                url: `http://localhost:8001/request/${requestId}`,
                data: body

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
