var biff = require ('../dispatcher/biff');
var Probe = require ('../models/Probe');

var _probes = [];

var createNewProbe = function(){
    var probe = new Probe();
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
            probe.start();
            this.emitChange();
            break;

        case 'STOP_PROBE':
            var probe = getCurrentProbe();
            probe.stop();
            this.emitChange();
            break;

        case 'TOGGLE_PROBE':
            var probe = getCurrentProbe();
            probe.toggle(payload.countdownCallback);
            this.emitChange();
            break;
    }

    return true;
});

module.exports = ProbeStore;