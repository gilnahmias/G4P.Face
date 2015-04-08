/**
 * @jsx React.DOM
 */

 'use strict';

 var React = require('react');
 var Banner = require ('./probe/Banner.jsx');
 var SpriteFrame = require ('./SpriteFrame.jsx');
 var ProbeActions = require('../actions/ProbeActions.js');
 var ProbeListActions = require('../actions/ProbeListActions.js');

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
            var banner = "It took you " + elapsed.toFixed(1) + "ms (frame " + frame + "/" + totalFrames + ").";
            this.setState ({banner: banner});
        }

        if (state == "not started"){
            this.setState({banner: "Space to Start"});
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
    handlePrev: function(){
        ProbeListActions.prev();
    },
    handleNext: function(){
        ProbeListActions.next();
    },
    onSpriteLoad: function(args){
        console.log ("LOADed in " + args.loadTime + " ms");
    },
    render() {
        var canMoveNext = this.props.canMoveNext;
        var canMovePrev = this.props.canMovePrev;
        var banner = isBannerVisible(this.props.probe.state) ?
             <Banner>
                <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'flex-start'}}>
                    <span style={{flexBasis: '10%'}} onClick={this.handlePrev}>{canMovePrev ? (<a href="#"><i className="glyphicon glyphicon-circle-arrow-left"></i></a>) : ""}</span>
                    <span style={{flexBasis: '80%'}}>{this.state.banner}</span>
                    <span style={{flexBasis: '10%'}} onClick={this.handleNext}>{canMoveNext ? (<a href="#"><i className="glyphicon glyphicon-circle-arrow-right"></i></a>) : ""}</span>
                </div>
             </Banner> :
             "";

        var sprite = this.props.probe.sprite || {}; // TODO: default to Sprite?

        var containerStyle = {
            display: 'flex',
        };

        var centerStyle = {
            margin: 'auto'
        };

        return (
          <div>
              {banner}
              
                <div style={containerStyle}>
                    <div style={centerStyle}>
                        <SpriteFrame
                            imageUrl={sprite.url} 
                            width={sprite.width} 
                            height={sprite.height} 
                            rows={sprite.rows} 
                            cols={sprite.cols} 
                            frame={this.state.frame}
                            totalFrames={sprite.frames} 
                            onLoad={this.onSpriteLoad} />
                    </div>
                </div>
          </div>
        );
    }
});

module.exports = Probe;