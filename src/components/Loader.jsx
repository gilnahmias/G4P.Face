/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Strings = require('../strings/Experiment-en').question;

var Loader = React.createClass({
    render() {
        return (
            <div className="loading">
                {Strings.loading}
            </div>
            );
    }
});

module.exports = Loader;