const express = require('express');
const app = express();

const {User} = require('./src/db/models');
const RequestController = require('./src/controllers/RequestController');

app.use(express.json())

app.use(RequestController);

app.get('/users', async function(req, res){

let data = await User.findAll()

    res.send(data);
})

app.get('/users/:id', async function(req, res){

    let data = await User.findByPk(req.params.id)

    res.send(data);
})

app.get('/user-create', async function(req, res){

    await User.create({

        userName : "Carlox",

        password : "1212",
    
        name : "Carlos",
    
        lastName : "Macedo",
    
        email : "aaa@aaa",
    
        address : "Case 22",
    
        phoneNumber : "1231232",
    
        requise : "muchos"

    })

    res.send("Create")
});

app.listen(6001);
