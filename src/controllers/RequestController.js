var express = require('express')
var router = express.Router()

const { Pet, Request, sequelize } = require('../db/models');

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
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(422).json(errorResponse)
        });
})

router.get('/requests-count-best', async function (req, res) {
    await Request.findAll({
        group: ['idMascot'],
        attributes: ['idMascot', [sequelize.fn('COUNT', 'id'), 'count']],
        order: [[sequelize.literal('count'), 'desc']],
        limit: 3,
    }).then(data =>{
        res.status(200).send(data);
    });
})

router.get('/requests-count-worst', async function (req, res) {
    await Pet.findAll({
        attributes:['id',[sequelize.fn('COUNT', 'id'), 'count']],
        include: {model: Request, attributes:['id']},
        group: ['id'],
        order: [[sequelize.literal('count'), 'asc']],
    }).then(data =>{
        res.status(200).send(data);
    });
})

module.exports = router;