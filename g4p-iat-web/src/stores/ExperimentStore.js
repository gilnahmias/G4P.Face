var biff = require ('../dispatcher/biff');
var Probe = require ('../models/Probe');
//var Experiment = require ('../models/Experiment');

var Sprite = require ('../../build/js/models/Sprite');
var Question = require ('../../build/js/models/Question');
var QuestionList = require ('../../build/js/models/QuestionList');
var Answer = require ('../../build/js/models/Answer');
var Experiment = require ('../../build/js/models/Experiment');


var _experiment = new Experiment();
_questionList = new QuestionList();

var sprites = [
    new Sprite("sprites/15x40/sprite-arab-angry-smile-small.jpg", 7680, 15360, 40, 15, 600),
    new Sprite("sprites/15x40/sprite-arab-angry-smile-teeth-small.jpg", 7680, 15360, 40, 15, 600),
    new Sprite("sprites/15x40/sprite-arab-smile-angry-teeth-small.jpg", 7680, 15360, 40, 15, 600),
    new Sprite("sprites/15x40/sprite-arab-smile-angry-small.jpg", 7680, 15360, 40, 15, 600),
    new Sprite("sprites/15x40/sprite-jew-angry-smile-small.jpg", 7680, 15360, 40, 15, 600),
    new Sprite("sprites/15x40/sprite-jew-angry-smile-teeth-small.jpg", 7680, 15360, 40, 15, 600),
    new Sprite("sprites/15x40/sprite-jew-smile-angry-teeth-small.jpg", 7680, 15360, 40, 15, 600),
    new Sprite("sprites/15x40/sprite-jew-smile-angry-small.jpg", 7680, 15360, 40, 15, 600)
];

var createNewProbe = function(id){
    /*
    var sprite = sprites[id];
    var probe = new Probe(sprite, id);
    _experiment.probes().add(probe);
    return probe;*/
};

var currentQuestion = function(){/*
    return _experiment.probes().getCurrentProbe();*/
    return _questionList.current;
};


var ExperimentStore = biff.createStore({
    getProbes: function(){
        return _questionList;
    },
    canMoveNext: function(){
        return _questionList.canMoveNext();
    },
    canMovePrev: function(){
        return _questionList.canMovePrev();
    },
    currentQuestion: currentQuestion,
}, function (payload){
    switch(payload.actionType){
        case 'LOAD_EXPERIMENT':
            debugger;
            _experiment = payload.experiment;
            _questionList = new QuestionList(_experiment.template.questions);
            this.emitChange();
            break;

        case 'START_EXPERIMENT':
            _experiment.userId = payload.userId;
            this.emitChange();
             break;

        case 'START_PROBE':
            var probe = getCurrentProbe();
            probe.start(payload.animationCallback);
            this.emitChange();
            break;

        case 'STOP_PROBE':
            var probe = getCurrentProbe();
            probe.stop();
            this.emitChange();
            break;

        case 'TOGGLE_PROBE':
            var probe = getCurrentProbe();
            probe.toggle(payload.countdownCallback, payload.animationCallback);
            this.emitChange();
            break;

        case 'NEXT_PROBE':
            _experiment.probes().next();
            console.log(_experiment.probes().getCurrentProbe().getId());
            this.emitChange();
            break;

        case 'PREV_PROBE':
            _experiment.probes().prev();
            console.log(_experiment.probes().getCurrentProbe().getId());
            this.emitChange();
            break;
    }

    return true;
});

module.exports = ExperimentStore;