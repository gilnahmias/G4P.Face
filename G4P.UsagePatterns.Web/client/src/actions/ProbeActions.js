var biff = require('../dispatcher/biff');
 
var ProbeActions = biff.createActions({
  addTest: function(text) {
    this.dispatch({
      actionType: 'ADD_TEST',
      text: text
    });
  }
});

module.exports = ProbeActions;