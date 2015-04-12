/**
 * @jsx React.DOM
 */

 'use strict';

 var React = require('react');
 var ExperimentStore = require('../stores/ExperimentStore.js');
 var Question = require ('../components/Question.jsx');
 var ThankYou = require ('../components/ThankYou.jsx');

 var getState = function(){
    var state = {
        question: ExperimentStore.currentQuestion(),
        canMovePrev: ExperimentStore.canMovePrev(),
        canMoveNext: ExperimentStore.canMoveNext(),
        experimentId: ExperimentStore.getExperimentId(),
        userId: ExperimentStore.getUserId(),
        done: ExperimentStore.getAllQuestionsDone()
    };

    return state;
};

var QuestionPage = React.createClass({
    mixins: [ExperimentStore.mixin],
    getInitialState: function() { return getState(); },
    storeDidChange: function() { this.setState(getState()); },
    render() {
        var state = this.state;

        var question = (<Question 
                        question={state.question} 
                        canMoveNext={state.canMoveNext}
                        canMovePrev={state.canMovePrev}
                        experimentId={state.experimentId}
                        userId={state.userId} />);


        return (<div>
                    {!this.state.done ? <ThankYou /> : {question}}
                </div>);
    }
});

module.exports = QuestionPage;