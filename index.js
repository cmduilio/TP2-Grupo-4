const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
const {User} = require('./src/db/models');
const user = require('./src/db/models/user');

app.listen(8001);

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

