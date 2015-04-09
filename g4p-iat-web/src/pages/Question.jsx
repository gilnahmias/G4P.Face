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
        canMoveNext: ExperimentStore.canMoveNext()
    };

    return state;
};

var QuestionPage = React.createClass({
    mixins: [ExperimentStore.mixin],
    getInitialState: function() { return getState(); },
    storeDidChange: function() { this.setState(getState()); },
    render() {
        return (<div>
                    <Question 
                        question={this.state.question} 
                        canMoveNext={this.state.canMoveNext}
                        canMovePrev={this.state.canMovePrev} />
                </div>);
    }
});

module.exports = QuestionPage;