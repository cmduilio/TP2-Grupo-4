const express = require('express');

const app = express();

 const {User} = require('./src/db/models')

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

app.listen(6001);