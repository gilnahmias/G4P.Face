/**
 * @jsx React.DOM
 */

 'use strict';

 var React = require('react');
 var Banner = require ('./probe/Banner.jsx');
 var SpriteFrame = require ('./SpriteFrame.jsx');
 var ProbeActions = require('../actions/ProbeActions.js');

 var keys = { Space: 32 };

var isBannerVisible = function(state){
    return state !== "running";
};

var Probe = React.createClass({
    getInitialState: function() {
        return {banner: "Space to Start"};
    },
    componentWillReceiveProps: function(){
        var probeState = this.props.probe.getState();
        if (probeState === "done"){
            this.setState ({banner: "It took you " + this.props.probe.elapsed() + " ms"});
        }
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
        var banner = isBannerVisible(this.props.probe.getState()) ?
             <Banner text={this.state.banner} /> :
             "";

        return (
          <div>
          probe
          {banner}
          {JSON.stringify (this.props.probe)}
          <SpriteFrame imageUrl="images/sprite1.png" width={710} height={355} rows={3} cols={6} frame={10} />
          </div>
          );
    }
});

module.exports = Probe;