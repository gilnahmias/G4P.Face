/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var ExperimentStore = require('../stores/ExperimentStore.js');
var Probe = require ('../components/Probe.jsx');

var getState = function(){
    var state = {
        probe: ExperimentStore.currentQuestion(),
        canMovePrev: ExperimentStore.canMovePrev(),
        canMoveNext: ExperimentStore.canMoveNext()
    };

    return state;
};

var ProbePage = React.createClass({
    mixins: [ExperimentStore.mixin],
    getInitialState: function() { return getState(); },
    storeDidChange: function() { this.setState(getState()); },
    render() {
        return (<div>
                    <Probe 
                        probe={this.state.probe} 
                        canMoveNext={this.state.canMoveNext}
                        canMovePrev={this.state.canMovePrev} />
                </div>);
    }
});

module.exports = ProbePage;