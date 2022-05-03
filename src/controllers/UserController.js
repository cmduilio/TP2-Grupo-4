var express = require('express')
var router = express.Router()

router.get('/users', function(req, res){
    return 'hello world'
});

module.exports = router;