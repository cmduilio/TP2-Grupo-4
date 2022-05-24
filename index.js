const express = require('express');
const app = express();
const Mascot = require('./src/db/models/mascot');

app.get('/', function(req, res) {
    res.send('hello');
});

app.get('/mascots', function(req, res) {
    res.send([]);
})

app.listen(8001);