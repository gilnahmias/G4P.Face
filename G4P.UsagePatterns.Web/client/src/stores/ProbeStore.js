var biff = require ('../dispatcher/biff');
var Sprite = require ('../models/Sprite');
var Probe = require ('../models/Probe');

var _probes = [];

var getSprite = function(){
    return new Sprite("images/sprite1.png", 710, 355, 3, 6);
};

var createNewProbe = function(){
    var sprite = getSprite();
    var probe = new Probe(sprite);
    _probes.push(probe);
    return probe;
};

var getCurrentProbe = function(){
    var probe = _probes.length === 0 ?
        createNewProbe() :
        _probes[_probes.length - 1];

    return probe;
};

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
    }

    return true;
});

module.exports = ProbeStore;