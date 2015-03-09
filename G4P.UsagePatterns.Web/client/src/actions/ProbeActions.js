var biff = require('../dispatcher/biff');

var ProbeActions = biff.createActions({
    toggleProbe: function(countdownCallback, animationCallback) {
        this.dispatch({
          actionType: 'TOGGLE_PROBE',
          countdownCallback: countdownCallback,
          animationCallback: animationCallback
      });
    },
    startProbe: function(animationCallback) {
        this.dispatch({
          actionType: 'START_PROBE',
          animationCallback: animationCallback
      });
    },
});

module.exports = ProbeActions;