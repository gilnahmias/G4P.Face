var biff = require ('../dispatcher/biff');
var Sprite = require ('../models/Sprite');
var Probe = require ('../models/Probe');
var ProbeList = require ('../models/ProbeList');

var _probes = new ProbeList();

var createSprite = function(){
    return new Sprite("images/sprite1.png", 710, 355, 3, 6);
};

var createNewProbe = function(id){
    var sprite = createSprite();
    var probe = new Probe(sprite, id);
    _probes.add(probe);
    return probe;
};

var getCurrentProbe = function(){
    return _probes.getCurrentProbe();
};

createNewProbe('one');
createNewProbe('two');
createNewProbe('three');

var ProbeStore = biff.createStore({
    getProbes: function(){
        return _probes;
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