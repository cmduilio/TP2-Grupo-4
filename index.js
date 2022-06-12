const express = require('express');
const { get } = require('express/lib/response');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const Sequelize = require('sequelize');
const {gte, lte, opIn} = Sequelize.Op;

const { User, Pet, Request } = require('./src/db/models');
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

    for (let i in setData) {
        if ((/^\s*$/i).test(setData[i])) {
            delete setData[i];
        }
    }

    if (Object.keys(setData).length === 0) {
        res.status(400).json({ message: "Request can't be empty" });
    }
    else if (setData.hasOwnProperty("id") || setData.hasOwnProperty("username") || setData.hasOwnProperty("password")) {
        res.status(400).json({ message: "Request can't be contain id, username or password on updating" });
    }
    else {
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

app.patch('/request/:id', async function (req, res) {


    if (Object.keys(req.body).length !== 2 ||
        !req.body.requestKey ||
        !req.body.status ||
        req.body.status === "open"
    ) {
        res.status(400).json({ message: "Bad request" }).send();
        return;
    }

    let idRequest = req.params.id;
    let body = req.body;

    let theRequest = await Request.findByPk(idRequest);

    if (!theRequest) {
        res.status(400).json({ message: "The request don't exist" }).send();
        return;
    }
    else if ((theRequest.idOwner + theRequest.idMascot) !== body.requestKey) {
        res.status(400).json({ message: "Bad Key" }).send();
        return;
    }
    else if (theRequest.status !== "open") {
        res.status(400).json({ message: "Request are already accepted" }).send();
        return;
    }

    let modified =
        await Request.update
            (
                body,
                { where: { id: idRequest } }

            ).catch(err => { res.status(500).json({ message: "Error updating" }).send(); });


    if (!modified) {
        res.status(400).json({ message: "It can't be modified" }).send();
        return;
    }
    else if (body.status === "accepted") {

        await Request.update
            (
                { status: "rejected" },
                { where: { idMascot: theRequest.idMascot, status: "open"} }
            ).catch(err => { res.status(500).json({ message: "Error updating" }).send(); });
    }


    modified =
        await Pet.update(
            { userId: theRequest.idRequester },
            { where: { id: theRequest.idMascot } }

        ).catch(err => { res.status(500).json({ message: "Error updating" }).send(); });

    if (!modified) {
        res.status(400).json({ message: "Pet not found" }).send();
        return;
    }

    res.status(201).send("Actualizacion completa");


})

app.post('/user', async function(req, res){

    for(let i in req.body){ 
        if((/^\s*$/i).test(req.body[i])){   
            delete req.body[i];
        }
    }

    if(Object.keys(req.body).length === 0)
    {
       res.status(400).json({ message: "Body can't be empty" }).send();
       return;
    }

    await User.create(req.body)
        .then(user => { res.status(201).send(); })
        .catch(err => { res.status(400).json(err).send();});
})

app.get('/requests', async function (req, res) {
    let data = await Request.findAll();
    res.send(data);
})

app.get('/requests/:id', async function (req, res) {
    let data = await Request.findByPk(req.params.id);
    res.send(data);
})

app.post('/requests', async function (req, res) {
    console.log(req.body)
    await Request.create(req.body);
    res.send(req.body);
})

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


app.get('/requests-sent', async function(req, res) {


    const userId = 10;

    let data = await Request.findAll({
        where: {idRequester : userId},
        limit: 20
    });
    
    res.send(data);

app.get('/pets/lookForOwner', async function(req, res){

    let data = await Pet.findAll(

        {where : {looksForOwner : true}}
    )

    res.send(data)

})

app.get('/received-requests', async function(req, res) {

    const userId = 10;

    let data = await Request.findAll({
        where: {idOwner : userId},
        limit: 20
    });
    
    res.send(data);
})

app.get('/pets/:id', async function (req, res) {

    let data = await Pet.findByPk(req.params.id);
    

    res.send(data);
});

app.get('/view/adoptable/', async function (req, res){

let filter = req.query
for(let key in filter ){
    if(Array.isArray(filter[key]) && filter[key].length==2){
        filter[key] = { [gte]:filter[key][0],[lte]:filter[key][1]};
    }
}

filter.looksForOwner = true;
    let pets = await Pet.findAll({
        where : filter
    });
    res.send(pets);
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
        id: req.params.id} });
    
    if(data == null){
        return res.status(422).json({mensaje: 'ANIMAL_NOT_FOUND'});
    }
    if(data.userId != userId){
        return res.status(422).json({mensaje: 'ANIMAL_DOES_NOT_BELONG_TO_USER'});
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

app.patch('/reject-request', async function(req, res) {

    let request = await Request.findByPk(req.body.requestId);
    const userId = 20;

    if(request == null){
        res.status(400).json({ message: "REQ_NOT_FOUND" });
        return;
    }
    else if(request.idOwner != userId){
        res.status(400).json({ message: "REQ_BELONGS_TO_DIFFERENT_USER" });
        return;
    }
    else if(request.status == 'rejected'){
        res.status(400).json({ message: "REQ_ALREADY_REJECTED" });
        return;
    }
    else if(request.status == 'accepted'){
        res.status(400).json({ message: "REQ_ALREADY_ACCEPTED" });
        return;
    }

    await Request.update
    (
        {status: "rejected"}, 
        { where: { id: request.id } }

    ).then(data => {res.status(200).json({})});
})

app.listen(8001);
//require('./test/testInServer')(app);
