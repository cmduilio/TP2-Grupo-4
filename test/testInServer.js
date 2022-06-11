
const { Request, User, Pet } = require('../src/db/models');

const { randFirstName, randLastName, randNumber,
    randEmail, randPassword, randUserName,
    randStreetAddress, randText,
    randDog, randBoolean
} = require('@ngneat/falso');
module.exports = function (app) {

    app.get('/test/request', async function (req, res) {
        let users = [];
        for (let x = 0; x < 2; x++) {
            users.push(await User.create({
                userName: randUserName(),
                password: randPassword(),
                name: randFirstName(),
                lastName: randLastName(),
                email: randEmail(),
                address: randStreetAddress(),
                phoneNumber: randNumber({ min: 10000000, max: 99999999 }),
                requise: randText(),
            }));
        }

        let pet = await Pet.create({
            animal: "perro",
            race: randDog(),
            name: randFirstName(),
            size: "grande",
            age: randNumber({ min: 0, max: 10 }),
            looksForOwner: randBoolean(),
            isVaccinated: randBoolean(),
            isCastrated: randBoolean(),
            comment: randText(),
            userId: randNumber({ min: 1, max: 1000 }),
        });


        let newRequest = { requestKey: users[0].id + pet.id };

        Object.assign(newRequest, (await Request.create({
            idOwner: users[0].id,
            idMascot: pet.id,
            idRequester: users[1].id,
            status: 'open',
        })).dataValues);

        res.send(newRequest);
    });

}