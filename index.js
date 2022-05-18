const express = require('express');

const app = express();

app.get('/', function(req, res){

    res.send('hello123');
})

app.get('/usuario', function(req, res){

    res.send([]);
})

app.listen(6001);