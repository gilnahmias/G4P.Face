var biff = require ('../dispatcher/biff');

var _probes = [];
var _testArr = [];

var addTest = function(){
    _testArr.push(new Date());
};

var ProbeStore = biff.createStore({
    getProbes: function(){
        return _probes;
    },
    getTest: function(){
        return _testArr;
    }
}, function (payload){
    switch(payload.actionType){
        case 'ADD_TEST':
            addTest();
            this.emitChange();
            break;
    }

    return true;
});

module.exports = ProbeStore;