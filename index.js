const express = require('express');
const app = express();
app.use(express.json());
const {Pet} = require('./src/db/models');

app.get('/', function(req, res) {
    res.send('hello');
});

app.get('/pets', async function(req, res) {

    let data = await Pet.findAll({limit: 20});

    res.send(data);
});

app.get('/pets/:id', async function(req, res) {

    let data = await Pet.findByPk(req.params.id);

    res.send(data);
});

app.post('/pets', async function (req, res) {

    await Pet.create(req.body);

    res.send('creado');
})

app.listen(8001);