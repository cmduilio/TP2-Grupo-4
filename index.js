const express = require('express');
const app = express();
app.use(express.json())

const {Request, User, Pet} = require('./src/db/models');

app.listen('8000');

app.get('/', function(req, res){

    res.send('hello123');
})

app.get('/users', async function(req, res){

let data = await User.findAll()

    res.send(data);
})

app.get('/users/:id', async function(req, res){

    let data = await User.findByPk(req.params.id)

    res.send(data);
})

    //actualizar Nombre

    app.get('/users/:id/changename/:newName', async function(req, res){

        await User.update({
            name : req.params.newName
        },
        {
         where : {id : req.params.id}   
        
        })

        let data = await User.findByPk(req.params.id)

        res.send(data);
    })

    //actualizar Apellido

    app.get('/users/:id/changelastname/:newLastName', async function(req, res){

        await User.update({
            lastName : req.params.newLastName
          },
          {
           where : {id : req.params.id}   
          
          })

          let data = await User.findByPk(req.params.id)

          res.send(data);
      })

    //actualizar Email

    app.get('/users/:id/changeemail/:newEmail', async function(req, res){

        await User.update({
            email : req.params.newEmail
          },
          {
           where : {id : req.params.id}   
          
          })

          let data = await User.findByPk(req.params.id)

          res.send(data);
      })

    //actualizar Direccion

    app.get('/users/:id/changeaddress/:newAddress', async function(req, res){

        await User.update({
            address : req.params.newAddress
          },
          {
           where : {id : req.params.id}   
          
          })

          let data = await User.findByPk(req.params.id)

          res.send(data);
      })

    //actualizar Numero de telefono

    app.get('/users/:id/changephonenumber/:newPhoneNumber', async function(req, res){

        await User.update({
            phoneNumber : req.params.newPhoneNumber
          },
          {
           where : {id : req.params.id}   
          
          })

          let data = await User.findByPk(req.params.id)

          res.send(data);
      })


    //actualizar Requerimientos

    app.get('/users/:id/changerequise/:newRequise', async function(req, res){

        await User.update({
            requise : req.params.newRequise
          },
          {
           where : {id : req.params.id}   
          
          })

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

app.get('/requests', async function(req,res){
    let data = await Request.findAll();
    res.send(data);
})

app.get('/requests/:id', async function(req,res){
    let data = await Request.findByPk(req.params.id);

    res.send(data);
})

app.post('/requests', async function(req,res){
    console.log(req.body)
    await Request.create(req.body);

    res.send(req.body);
})

app.get('/pets', async function(req, res) {

    let q = {};

    if(req.query.userId){
        q.userId = req.query.userId;
    };

    let data = await Pet.findAll({
        where : q,
        limit: 20
    });

    res.send(data);
});

app.get('/pets/:id', async function(req, res) {

    let data = await Pet.findByPk(req.params.id);

    res.send(data);
});

app.post('/pets', async function (req, res) {

    await Pet.create(req.body);

    res.send('creado');
});