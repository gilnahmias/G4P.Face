var express = require('express');
var router = express.Router();
var Experiment = require('../build/js/models/Experiment.js');
var ExperimentTeamplate = require('../build/js/models/ExperimentTemplate.js');
var Question = require('../build/js/models/Question.js');
var Sprite = require('../build/js/models/Sprite.js');

var questions = [
    new Question("q1", "s2", "", "מוחמד"),
    new Question("q1", "s4", "", "מוחמוד"),
    new Question("q1", "s7", "", "אבי"),
    new Question("q1", "s8", "", "אבי")
];

var template = new ExperimentTeamplate("et1", "test", questions);
var experiment = new Experiment("e1", ["gil"], ["test"], new Date(), template);

/* GET experiment listing. */
router.get('/', function (req, res) {
    res.send([experiment]);
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    res.send(id);
});

module.exports = router;