var biff = require('../dispatcher/biff');

var QuestionActions = biff.createActions({
    toggleQuestion: function(countdownCallback, animationCallback) {
        this.dispatch({
          actionType: 'TOGGLE_QUESTION',
          countdownCallback: countdownCallback,
          animationCallback: animationCallback
      });
    },
    startQuestion: function(animationCallback) {
        this.dispatch({
          actionType: 'START_QUESTION',
          animationCallback: animationCallback
      });
    },
});

module.exports = QuestionActions;