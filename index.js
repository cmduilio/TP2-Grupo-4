const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
const {User} = require('./src/db/models');
const user = require('./src/db/models/user');

app.get('/', function (req, res) {

    res.send('hello123');
})

app.get('/users', async function (req, res) {

    let data = await User.findAll()

    res.send(data);
})

app.get('/users/:id', async function (req, res) {

    let data = await User.findByPk(req.params.id)

    res.send(data);
})

//dps lo corrijo, xq tengo que hacer el commiteo bla bla - lo dejamos asi tambien en el test. pero se marca como pendiente de cambio

///!!! Pendiente de cambio: "/users/:id"
app.patch('/users/:id/updateuser', (req, res) => {

    let option = { where: { id: req.params.id } };
    let setData = req.body;

    for(let i in setData){ 
        if((/^\s*$/i).test(setData[i])){   
            delete setData[i];
        }
    }


});

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

app.listen(6001);