/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Strings = require('../strings/Experiment-en.js').thankYou;

var ThankYou = React.createClass({
    render() {
        return (
            <div className="thank-you">
                <h1>{Strings.title}</h1>
                <h2>{Strings.subtitle}</h2>
            </div>
            );
    }
});

module.exports = ThankYou;