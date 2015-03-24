var biff = require ('../dispatcher/biff');
var Sprite = require ('../models/Sprite');
var Probe = require ('../models/Probe');
var Experiment = require ('../models/Experiment');

var _experiment = new Experiment();

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
    var sprite = sprites[id];
    var probe = new Probe(sprite, id);
    _experiment.probes().add(probe);
    return probe;
};

var getCurrentProbe = function(){
    return _experiment.probes().getCurrentProbe();
};

createNewProbe(5);
createNewProbe(2);

var ExperimentStore = biff.createStore({
    getProbes: function(){
        return _experiment.probes();
    },
    canMoveNext: function(){
        return _experiment.probes().canMoveNext();
    },
    canMovePrev: function(){
        return _experiment.probes().canMovePrev();
    },
    getCurrentProbe: getCurrentProbe,
}, function (payload){
    switch(payload.actionType){
        case 'START_EXPERIMENT':
            _experiment.userId = payload.userId;
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