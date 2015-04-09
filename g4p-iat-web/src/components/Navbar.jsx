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
        <div className="container">
          <Link className="navbar-brand row" to="home">
            {' Games for peace'}
          </Link>
        </div>
      </div>
    );
  }
});

module.exports = Navbar;
