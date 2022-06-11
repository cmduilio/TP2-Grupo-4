const express = require('express');
const { get } = require('express/lib/response');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const {Request, User, Pet} = require('./src/db/models');


app.get('/users', async function (req, res) {

    let data = await User.findAll()

    res.send(data);
})

app.get('/users/:id', async function (req, res) {

    let data = await User.findByPk(req.params.id)

    res.send(data);
})


app.patch('/users/:id/updateuser', (req, res) => {

    let option = { where: { id: req.params.id } };
    let setData = req.body;

    for(let i in setData){ 
        if((/^\s*$/i).test(setData[i])){   
            delete setData[i];
        }
    }

    if(Object.keys(setData).length === 0)
    {
        res.status(400).json({ message: "Request can't be empty" });
    }
    else if(setData.hasOwnProperty("id") || setData.hasOwnProperty("username") || setData.hasOwnProperty("password"))
    {
        res.status(400).json({ message: "Request can't be contain id, username or password on updating" });  
    }
    else{
        User.update(setData,
            option
        ).then(User => {
            if (User) {
                res.status(201).json(User);
            } else {
                res.status(400).json({ message: "Record not found" });
            }
        }).catch(err => {
            res.status(500).json({ message: "Error updating" });
        })
    }


});

app.patch('/request/:id', async function(req, res){
    
    
    if( Object.keys(req.body).length !== 2 || 
        !req.body.requestKey || 
        !req.body.status || 
        req.body.status === "open"
    ){
        res.status(400).json({ message: "Bad request" }).send();
        return;
    }

    let idRequest = req.params.id;
    let body = req.body;
    
    let theRequest = await Request.findByPk(idRequest);

    if(!theRequest){
        res.status(400).json({ message: "The request don't exist" }).send();
        return;
    }
    else if((theRequest.idOwner + theRequest.idMascot) !== body.requestKey ){
        res.status(400).json({ message: "Bad Key" }).send();
        return;
    }
    else if(theRequest.status !== "open" ){
        res.status(400).json({ message: "Request are already accepted" }).send();
        return;
    }

    let modified = 
    await Request.update
    (
        body, 
        { where: { id: idRequest } }

    ).catch(err => { res.status(500).json({ message: "Error updating" }).send(); });


    if (!modified){
        res.status(400).json({ message: "It can't be modified" }).send();
        return;
    }

    modified = 
    await Pet.update(
        {userId: theRequest.idRequester},
        { where: { id: theRequest.idMascot } }

    ).catch(err => { res.status(500).json({ message: "Error updating" }).send(); });

    if (!modified){
        res.status(400).json({ message: "Pet not found" }).send();
        return;
    }
    
    res.status(201).send("Actualizacion completa");


})

app.get('/requesttest/:id', async function(req, res){

    let valor =
        await Request.findAll({
            where: {
                id : req.params.id 
            },
            attributes: ['idMascot']
        });

        res.send(valor);
    
})

app.get('/user-create', async function (req, res) {
///test?
    await User.create({

        userName: "Carlox",

        password: "1212",

        name: "Carlos",

        lastName: "Macedo",

        email: "aaa@aaa",

        address: "Case 22",

        phoneNumber: "1231232",

        requise: "muchos"

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

    if(req.body.age > 3 && !req.body.isVaccinated){
       return res.status(422).json({mensaje: 'VACC_REQUIRED'});
    }

    await Pet.create(req.body)
        .then(data => {res.status(201).json({})})
            .catch(err => {res.status(422).json(err)})
});


app.listen(8001);
require('./test/testInServer')(app);