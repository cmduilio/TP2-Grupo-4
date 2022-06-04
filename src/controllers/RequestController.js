var express = require('express')
var router = express.Router()

const { Request } = require('../db/models');

router.get('/requests', async function (req, res) {

    console.log("alerta");
    res.status(422).json({ message: 'pep' })

    let data = await Request.findAll();
    res.send(data);
})

router.get('/requests/:id', async function (req, res) {
    let data = await Request.findByPk(req.params.id);

    res.send(data);
})

router.post('/requests', async function (req, res) {
    console.log(req.body)
    await Request.create(req.body)
    .then(data => {res.status(201).json({})})
    .catch(err => {res.status(422).json({})});
})

module.exports = router;