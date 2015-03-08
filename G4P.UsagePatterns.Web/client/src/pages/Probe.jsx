/**
 * @jsx React.DOM
 */

 'use strict';

var React = require('react');
var ProbeStore = require('../stores/ProbeStore.js');
var ProbeActions = require('../actions/ProbeActions.js');

var getState = function(){
    return {test: ProbeStore.getTest()};
};

var Probe = React.createClass({
    mixins: [ProbeStore.mixin],
    getInitialState: function() { return getState(); },
    storeDidChange: function() { this.setState(getState()); },
    addTest: function(){ ProbeActions.addTest(); },
    render() {
        return (<div>
                Probe page here
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
                <ul>
                {this.state.test.map(function(item){
                    return (
                        <li>{item.toString()}</li>
                        );
                })}
                </ul>
                <button onClick={this.addTest}>Add test</button>
            </div>);
    }
});

module.exports = Probe;