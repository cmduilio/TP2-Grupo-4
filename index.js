const express = require('express');
const app = express();
const {Request} = require('./src/db/models');

app.get('/', function(req,res){
    res.send('hello')
})

app.get('/requests', async function(req,res){
    let data = await Request.findAll();

    res.send(data);
})


app.get('/requests/:id', async function(req,res){
    let data = await Request.findByPk(req.params.id);

    res.send(data);
})

app.post('/requests', async function(req,res){
    await Request.create({
        idOwner: 1,
        idMascot: 1,
        idRequester: 2,
        status: 'open',
    });

    res.send('created');
})

app.listen(8080);