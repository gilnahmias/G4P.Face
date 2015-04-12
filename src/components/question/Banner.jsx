/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var Banner = React.createClass({
    render() {
        return (<div className="banner">
                    {this.props.children}
                </div>);
    }
});

module.exports = Banner;