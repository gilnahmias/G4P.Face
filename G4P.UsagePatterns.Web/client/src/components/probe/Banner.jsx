/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var style = {
    fontSize: 22,
    width: '100%',
    backgroundColor: 'rgba(120,241,87,0.7)',
    height: 70,
    textAlign: 'center',
    position: 'absolute',
    zIndex: 800,
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: 400,
    display: 'box',
    boxAlign: 'center',
    filter: 'blur(5px)'
};

var Banner = React.createClass({
    render() {
        return (<div style={style}>
                    {this.props.text}
                </div>);
    }
});

module.exports = Banner;