var biff = require('../dispatcher/biff');

var ProbeListActions = biff.createActions({
    next: function() {
        this.dispatch({
          actionType: 'NEXT_PROBE',
      });
    },
    prev: function() {
        this.dispatch({
          actionType: 'PREV_PROBE',
      });
    },
});

module.exports = ProbeListActions;