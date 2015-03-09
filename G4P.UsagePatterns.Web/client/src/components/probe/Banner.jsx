/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var style = {
    fontSize: 22,
    width: '100%',
    backgroundColor: 'yellow',
    height: 70,
    textAlign: 'center'
};

var Banner = React.createClass({
    render() {
        return (<div style={style}>
                    {this.props.text}
                </div>);
    }
});

module.exports = Banner;