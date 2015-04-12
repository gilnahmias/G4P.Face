/**
 * @jsx React.DOM
 */

 'use strict';

 var React = require('react');
 var ExperimentStore = require('../stores/ExperimentStore.js');

 var getState = function(){
    var state = {
    };

    return state;
};

var AdminPage = React.createClass({
    mixins: [ExperimentStore.mixin],
    getInitialState: function() { return getState(); },
    storeDidChange: function() { this.setState(getState()); },
    render() {
            return (<div>
                    admin pageee
                </div>);
    }
});

module.exports = AdminPage;