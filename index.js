const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const { User, Pet } = require('./src/db/models');
const RequestController = require('./src/controllers/RequestController');

app.listen('8000');

app.use(express.json())

app.use(RequestController);

app.get('/users', async function (req, res) {

    let data = await User.findAll()

    res.send(data);
})

app.get('/users/:id', async function (req, res) {

    let data = await User.findByPk(req.params.id)

    res.send(data);
})

app.get('/user-create', async function (req, res) {

    await User.create({

        userName: "Carlox",

        password: "1212",

        name: "Carlos",

        lastName: "Macedo",

        email: "aaa@aaa",

        address: "Case 22",

        phoneNumber: "1231232",

        requise: "muchos"

    })

    res.send("Create")
});

app.get('/pets', async function (req, res) {

    let q = {};

    if (req.query.userId) {
        q.userId = req.query.userId;
    };

    let data = await Pet.findAll({
        where: q,
        limit: 20
    });

    res.send(data);
});

app.get('/pets/:id', async function (req, res) {

    let data = await Pet.findByPk(req.params.id);

    res.send(data);
});

app.post('/pets', async function (req, res) {

    if (req.body.age > 3 && !req.body.isVaccinated) {
        return res.status(422).json({ mensaje: 'VACC_REQUIRED' });
    }

    await Pet.create(req.body)
        .then(data => { res.status(201).json({}) })
        .catch(err => { res.status(422).json(err) })
});

app.listen(8001);