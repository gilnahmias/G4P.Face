/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var {Routes, Route} = require('react-router');

var Answer = require ('../models/Answer.ts');
var Browser = require ('../models/Browser.ts');
var Experiment = require ('../models/Experiment.ts');
var ExperimentTemplate = require ('../models/ExperimentTemplate.ts');
var Question = require ('../models/Question.ts');
var User = require ('../models/User.ts');

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

React.renderComponent(
  <Routes location="history">
    <Route name="app" path="/" handler={require('./layouts/Default.jsx')}>
      <Route name="home" handler={require('./pages/Home.jsx')} />
      <Route name="privacy" handler={require('./pages/Privacy.jsx')} />
      <Route name="probe" handler={require('./pages/Probe.jsx')} />
      <Route name="startExperiment" path="/" handler={require('./pages/StartExperiment.jsx')} />
    </Route>
  </Routes>,
  document.body
);
