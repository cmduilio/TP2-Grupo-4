const express = require('express');
const { get } = require('express/lib/response');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const { User, Pet } = require('./src/db/models');
const RequestController = require('./src/controllers/RequestController');

app.use(express.json())

app.use(RequestController);

app.get('/users', async function (req, res) {

    let data = await User.findAll()

    res.send(data);
})

app.get('/users/:id', async function (req, res) {

    let data = await User.findByPk(req.params.id)

    res.send(data);
})


app.patch('/users/:id', (req, res) => {

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

app.put('/accept-request/:id', async function(req, res){
    
    
    if(Object.keys(req.body).length !== 1 || !Object.keys(req.body).includes('requestKey')){
        res.status(400).json({ message: "Bad request" }).send();
        return;
    }

    let idRequest = req.params.id;
    let key = req.body.requestKey;   //obtenemos la llave de permiso
    
    let request = await Request.findByPk(idRequest);

    if(!request){
        res.status(400).json({ message: "Record not found" });
        return;
    }

    else if((request.idOwner + request.idMascot) !== key ){
        res.status(400).json({ message: "Bad Key" }).send();
        return;
    }
    else if(request.status !== "open" ){
        res.status(400).json({ message: "Request are already accepted" }).send();
        return;
    }

    let modified = 
    await Request.update
    (
        {status: "accepted"}, 
        { where: { id: idRequest } }

    ).catch(err => { res.status(500).json({ message: "Error updating" }).send(); });


    if (!modified){
        res.status(400).json({ message: "It can't be modified" }).send();
        return;
    }

    modified = 
    await Pet.update(
        {userId: request.idRequester},
        { where: { id: request.idMascot } }

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

app.get('/pets', async function (req, res) {

    let q = {};

    if (req.query.userId) {
        q.userId = req.query.userId;
    };

    let data = await Pet.findAll({
        where: q,
        limit: 20
    });

    res.send(data);
});

app.get('/pets/:id', async function (req, res) {

    let data = await Pet.findByPk(req.params.id);
    

    res.send(data);
});

app.post('/pets', async function (req, res) {

    const userId = 1;

    let data = await Pet.findOne(
        {where: {
            animal: req.body.animal,
            race: req.body.race,
            name: req.body.name,
            size: req.body.size,
            age: req.body.age,
            looksForOwner: req.body.looksForOwner,
            isVaccinated: req.body.isVaccinated,
            isCastrated: req.body.isCastrated,
            userId: userId
    }});
    
    if(data){
        return res.status(422).json({mensaje: 'PET_EXISTS'});
    }
    if(req.body.age > 3 && !req.body.isVaccinated){
       return res.status(422).json({mensaje: 'VACC_REQUIRED'});
    }
    if(req.body.age <= 5 && !req.body.isCastrated){
        return res.status(422).json({mensaje: 'NEUT_REQUIRED'});
    }

    let pet = req.body;
    pet.userId = userId;

    await Pet.create(pet)
        .then(data => {res.status(201).json({})})
            .catch(err => {res.status(422).json(err)})

});

app.patch('/pets/:id', async function (req, res) {

    const userId = 2;

    let data = await Pet.findOne({ where: {
        id: req.params.id,
        userId :  userId} });
    
    if(data == null){
        return res.status(422).json({mensaje: 'ANIMAL_NOT_FOUND'});
    }    
    if(req.body.animal){
        if(data.animal !== req.body.animal){
            return res.status(422).json({mensaje: 'ANIMALTYPE_CANNOT_BE_MODIFIED'});
        }
    }

    await Pet.update(
        req.body,
        {where: {id: data.id}})
            .then(data => {res.status(201).json({})})
                .catch(err => {res.status(422).json(err)})
});

app.listen(8001);
