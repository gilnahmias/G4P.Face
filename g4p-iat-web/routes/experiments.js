var express = require('express');
var router = express.Router();
//var Experiment = require('../models/Experiment.ts');

/* GET experiment listing. */
router.get('/', function (req, res) {
    res.send(new Experiment());
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    res.send(id);
});

module.exports = router;