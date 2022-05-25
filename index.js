const express = require('express');
const app = express();
const {Mascot} = require('./src/db/models');

app.get('/', function(req, res) {
    res.send('hello');
});

app.get('/mascots', async function(req, res) {

    let data = await Mascot.findAll();

    res.send(data);
});

app.get('/mascots/:id', async function(req, res) {

    let data = await Mascot.findByPk(req.params.id);

    res.send(data);
});

app.post('/mascots', async function (req, res) {
    
    await Mascot.create(req.body);

    res.send(req.body);
})

app.listen(8001);