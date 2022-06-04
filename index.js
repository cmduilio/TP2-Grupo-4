const express = require('express');

const app = express();

//commit

app.use(express.json());
app.use(express.urlencoded({extended: true}))

 const {User} = require('./src/db/models');
const user = require('./src/db/models/user');

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

    //borrar

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

    //borrar

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

    //commitear borrar
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

    //commitear

        app.patch('/users/:id',(req,res)=>{           

            let option = {where : {id : req.params.id}};
            let setData = req.body;

             User.update(setData,                          
                options
                ).then(User =>{

                 if(User){
                     res.status(200).json(User);
                 }else{
                     res.status(404).json({message : "Record not found"});
                 }
             }).catch(err => {
                    
                 res.status(500).json({message : "Error updating"})
             })
               
 
        });

        //borrar

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

    //borrar

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


    //borrar

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


      //borrar

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