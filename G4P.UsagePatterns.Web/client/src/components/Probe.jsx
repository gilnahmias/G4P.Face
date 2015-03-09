/**
 * @jsx React.DOM
 */

 'use strict';

 var React = require('react');
 var Banner = require ('./probe/Banner.jsx');
 var ProbeActions = require('../actions/ProbeActions.js');

 var keys = { Space: 32 };

var Probe = React.createClass({
    getInitialState: function() {
        return {banner: "Space to start"};
    },
    componentWillMount: function() {
        if(window.addEventListener) {
            window.addEventListener("keyup",this.handleGlobalKeyUp,false);
        } else if (window.attachEvent){ // Added for IE<9
            window.attachEvent("keyup", this.handleGlobalKeyUp);
        }
    },
    componentWillUnmount: function() {
        if(window.removeEventListener) {
            window.removeEventListener("keyup",this.handleGlobalKeyUp,false);
        } else if (window.detachEvent){ // Added for IE<9
            window.detachEvent("keyup", this.handleGlobalKeyUp);
        }
    },
    handleGlobalKeyUp : function(e){
        if (e.which === keys.Space){
            //this.props.probe.countdown(this.countdownChanged);
            ProbeActions.toggleProbe(this.countdownChanged);
        }
    },
    countdownChanged: function (secondsToStart){
        if (secondsToStart === 0){
            ProbeActions.startProbe();
        }
        else {
            this.setState({ banner: "We will start in " + secondsToStart + " seconds" });
        }
    },
    render() {
        return (
          <div>
          probe
          <Banner text={this.state.banner} />
          {JSON.stringify (this.props.probe)}
          </div>
          );
    }
});

module.exports = Probe;