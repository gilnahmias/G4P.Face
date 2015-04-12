/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var style = {
    position: 'absolute',
    zIndex: 10,
    fontSize: 50,
    top: 210,
    left: '35%'
};

var Loader = React.createClass({
    render() {
        return (
            <div style={style}>
                Loading...
            </div>
            );
    }
});

module.exports = Loader;