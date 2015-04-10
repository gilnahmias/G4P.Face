/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var ExperimentStore = require('../stores/ExperimentStore.js');
var Question = require ('../components/Question.jsx');

var getState = function(){
    var state = {
        question: ExperimentStore.currentQuestion(),
        canMovePrev: ExperimentStore.canMovePrev(),
        canMoveNext: ExperimentStore.canMoveNext(),
        experimentId: ExperimentStore.getExperimentId(),
        userId: ExperimentStore.getUserId()
    };

    return state;
};

var QuestionPage = React.createClass({
    mixins: [ExperimentStore.mixin],
    getInitialState: function() { return getState(); },
    storeDidChange: function() { this.setState(getState()); },
    render() {
        var state = this.state;

        return (<div>
                    <Question 
                        question={state.question} 
                        canMoveNext={state.canMoveNext}
                        canMovePrev={state.canMovePrev}
                        experimentId={state.experimentId}
                        userId={state.userId} />
                        }
                        }
                </div>);
    }
});

module.exports = QuestionPage;