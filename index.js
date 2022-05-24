const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('hello');
});

app.get('/mascots', function(req, res) {
    res.send([]);
})

app.listen(8001);