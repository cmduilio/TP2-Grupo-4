var express = require('express')
var router = express.Router()

const { Request } = require('../db/models');

router.get('/requests', async function (req, res) {
    let data = await Request.findAll();
    res.send(data);
})

router.get('/requests/:id', async function (req, res) {
    let data = await Request.findByPk(req.params.id);
    if (!data || data === ''){
        res.status(422).json(
            {
                message: `error getting request with id ${req.params.id}`
            }
        )
    }
    res.status(200).send(data);
})

router.post('/requests', async function (req, res) {
    const request = req.body;
    const errorResponse = {
        message : 'Error creating request'
    };

    await Request.create(request)
    .then(data => {
        res.status(201).sent(data)
    })
    .catch(err => {
        res.status(422).json(errorResponse)
    });
})

module.exports = router;