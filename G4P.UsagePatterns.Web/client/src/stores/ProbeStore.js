var biff = require ('../dispatcher/biff');
var Sprite = require ('../models/Sprite');
var Probe = require ('../models/Probe');
var ProbeList = require ('../models/ProbeList');

var _probes = new ProbeList();

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
    _probes.add(probe);
    return probe;
};

var getCurrentProbe = function(){
    return _probes.getCurrentProbe();
};

createNewProbe(5);
createNewProbe(2);
createNewProbe(3);
createNewProbe(4);
createNewProbe(5);

var ProbeStore = biff.createStore({
    getProbes: function(){
        return _probes;
    },
    canMoveNext: function(){
        return _probes.canMoveNext();
    },
    canMovePrev: function(){
        return _probes.canMovePrev();
    },
    getCurrentProbe: getCurrentProbe,
}, function (payload){
    switch(payload.actionType){
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
            _probes.next();
            console.log(_probes.getCurrentProbe().getId());
            this.emitChange();
            break;

        case 'PREV_PROBE':
            _probes.prev();
            console.log(_probes.getCurrentProbe().getId());
            this.emitChange();
            break;
    }

    return true;
});

module.exports = ProbeStore;