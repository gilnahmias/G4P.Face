var biff = require('../dispatcher/biff');
var ExperimentRepository = require('../../build/js/repositories/ExperimentRepository');

var _repo = new ExperimentRepository();

var ExperimentActions2 = biff.createActions({
    loadExperiment: function() {
        debugger;
        var dispatch = this.dispatch;

        _repo.fetch().then(function(experiment){
            dispatch({
                actionType: 'LOAD_EXPERIMENT',
                experiment: experiment
            });
        }); 
    }
});

module.exports = ExperimentActions2;