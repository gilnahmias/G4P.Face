var biff = require('../dispatcher/biff');

var ExperimentActions = biff.createActions({
    startExperiment: function(userId, machineId) {
        this.dispatch({
          actionType: 'START_EXPERIMENT',
          userId: userId,
          machineId: machineId
      });
    }
});

module.exports = ExperimentActions;