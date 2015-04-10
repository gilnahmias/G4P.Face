var biff = require('../dispatcher/biff');

var AnswerActions = biff.createActions({
    saveAnswer: function(question, experimentId, userId){
      var answer = Answer.fromQuestion(question, experimentId, userId)
      $.post ('experiments/' + experimentId + '/answers', answer);
    }
});

module.exports = AnswerActions;