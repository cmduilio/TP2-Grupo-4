const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');
const { randBetweenDate, randStreetAddress, randEmail,
    randUserName, randFirstName, randLastName, randPassword,
    randNumber, randText } = require('@ngneat/falso');


describe('User registered', () => {

    const userTest = {
        userName: randUserName(),
        password: randPassword(),
        name: randFirstName(),
        lastName: randLastName(),
        email: randEmail(),
        address: randStreetAddress(),
        phoneNumber: randNumber({ min: 10000000, max: 90000000 }),
        requise: randText(),
    };
    //si se creo exitosamente

    it('returns 201 if the user successfully registered', (done) => {



        axios({
            method: "post",
            url: `http://localhost:8001/user`,
            data: userTest

        }).then(response => {
            assert.equal(response.status, 201);
            done();
        }).catch(err => {
            done(err);
        });

    });
    it('returns 400 if the user is duplicate', (done) => {
        let duplicate = {...userTest, id: 1}

        axios({
            method: "post",
            url: `http://localhost:8001/user`,
            data: duplicate

        }).then(response => {
            assert.equal(response.status, 400);
            done();
        }).catch(err => {
            if (Object.keys(err).includes("response")) {
                assert.equal(err.response.status, 400);
                done();
            }
            else done(err);
        })

    });


    it('returns 400 if the user is empty', (done) => {


        axios({
            method: "post",
            url: `http://localhost:8001/user`,
            data: {}

        }).then(response => {
            assert.equal(response.status, 400);
            done();
        }).catch(err => {
            if (Object.keys(err).includes("response")) {
                assert.equal(err.response.status, 400);
                done();
            }
            else done(err);
        }).catch(err => {
            done(err);
        })

    });

    it('returns 400 if the user have empty field', (done) => {

        const userTestEmp = {
            userName: " ",
            password: "   \t ",
            requise: randText(),
        };

        axios({
            method: "post",
            url: `http://localhost:8001/user`,
            data: userTestEmp

        }).then(response => {
            assert.equal(response.status, 400);
            done();
        }).catch(err => {
            if (Object.keys(err).includes("response")) {
                assert.equal(err.response.status, 400);
                done();
            }
            else done(err);
        }).catch(err => {
            done(err);
        })

    });

});