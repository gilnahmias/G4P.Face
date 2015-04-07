var express = require('express');
var router = express.Router();
var Experiment = require('../build/models/js/Experiment.js');

/* GET experiment listing. */
router.get('/', function (req, res) {
    res.send(new Experiment("1", [2,3]));
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    res.send(id);
});

module.exports = router;