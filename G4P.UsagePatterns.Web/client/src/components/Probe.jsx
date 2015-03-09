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
        return {banner: "Space to Start", frame: 0};
    },
    componentWillReceiveProps: function(nextProps){
        var probe = nextProps.probe;
        var state = probe.getState();
        var elapsed = probe.elapsed();
        var frame = probe.getFrame();
        var totalFrames = probe.getSprite().getTotalFrames();
        if (state === "done"){
            var banner = "It took you " + elapsed + "ms (frame " + frame + "/" + totalFrames + ").";
            this.setState ({banner: banner});
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
            ProbeActions.toggleProbe(this.countdownChanged, this.frameChanged);
        }
    },
    countdownChanged: function (secondsToStart){
        if (secondsToStart === 0){
            ProbeActions.startProbe(this.frameChanged);
        }
        else {
            this.setState({ banner: "We will start in " + secondsToStart + " seconds" });
        }
    },
    frameChanged: function (frame){
        this.setState({frame: frame});
    },
    render() {
        var banner = isBannerVisible(this.props.probe.getState()) ?
             <Banner text={this.state.banner} /> :
             "";

        var sprite = this.props.probe.getSprite();

        return (
          <div>
              probe
              {banner}
              {JSON.stringify (this.props.probe)}

              <SpriteFrame 
                    imageUrl={sprite.getImageUrl()} 
                    width={sprite.getWidth()} 
                    height={sprite.getHeight()} 
                    rows={sprite.getRows()} 
                    cols={sprite.getCols()} 
                    frame={this.state.frame} />
          </div>
        );
    }
});

module.exports = Probe;