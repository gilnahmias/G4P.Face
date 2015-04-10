var express = require('express');
var router = express.Router();
var Answer = require('../build/js/models/Answer.js');
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

var experiments = {"e1": experiment};

// TODO: _.forOwn
var values = function(dict){
    return Object.keys(dict).map(function(key){
        return dict[key];
    });
};

var tempAnswerFromJS = function (js){
    js = js || {};
    return new Answer(
                js.id, 
                js.timestamp, 
                js.frame, 
                js.duration,
                js.userId,
                js.machineId, 
                js.questionId, 
                js.experimentId);
};

/* GET experiment listing. */
router.get('/', function (req, res) {
    res.send(values(experiments));
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    res.send(experiments[id]);
});

router.post('/:id/answers', function (req, res) {
    var id = req.params.id;
    var answer = tempAnswerFromJS(req.body); // should be Answer.fromJS()
    experiments[id].addAnswer(answer);
    res.send(answer);
});

module.exports = router;