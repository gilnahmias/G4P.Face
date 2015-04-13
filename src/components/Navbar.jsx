/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var {Link} = require('react-router');

var Navbar = React.createClass({
  render() {
    return (
      <div className="navbar-top">
        <div className="container-g4p">
          <Link className="navbar-brand-g4p row" to="startExperiment">
            {' Games for peace'}
          </Link>
        </div>
      </div>
    );
  }
});

module.exports = Navbar;
