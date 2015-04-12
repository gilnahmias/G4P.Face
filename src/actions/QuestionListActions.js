var biff = require('../dispatcher/biff');

var QuestionListActions = biff.createActions({
    next: function() {
        this.dispatch({
          actionType: 'NEXT_QUESTION',
      });
    },
    prev: function() {
        this.dispatch({
          actionType: 'PREV_QUESTION',
      });
    },
});

module.exports = QuestionListActions;