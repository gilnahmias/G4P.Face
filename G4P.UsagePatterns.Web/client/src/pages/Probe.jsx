/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var ProbeStore = require('../stores/ProbeStore.js');
var Probe = require ('../components/Probe.jsx');

var getState = function(){
    return {
        probe: ProbeStore.getCurrentProbe(),
        canMovePrev: ProbeStore.canMovePrev(),
        canMoveNext: ProbeStore.canMoveNext()
    };
};

var ProbePage = React.createClass({
    mixins: [ProbeStore.mixin],
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