const express = require('express');
const app = express();
const {Mascot} = require('./src/db/models');

app.get('/', function(req, res) {
    res.send('hello');
});

app.get('/mascots', async function(req, res) {

    let data = await Mascot.findAll();

    res.send(data);
})

app.listen(8001);