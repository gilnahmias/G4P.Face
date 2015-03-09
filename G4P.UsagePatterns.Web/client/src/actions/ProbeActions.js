var biff = require('../dispatcher/biff');

var ProbeActions = biff.createActions({
    toggleProbe: function(countdownCallback) {
        this.dispatch({
          actionType: 'TOGGLE_PROBE',
          countdownCallback: countdownCallback
      });
    },
    startProbe: function(text) {
        this.dispatch({
          actionType: 'START_PROBE'
      });
    },
});

module.exports = ProbeActions;