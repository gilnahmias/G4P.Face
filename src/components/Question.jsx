/**
 * @jsx React.DOM
 */

 'use strict';

 var React = require('react');
 var Banner = require ('./question/Banner.jsx');
 var Loader = require ('./Loader.jsx');
 var SpriteFrame = require ('./SpriteFrame.jsx');
 var QuestionActions = require('../actions/QuestionActions.js');
 var AnswerActions = require('../actions/AnswerActions.js');
 var QuestionListActions = require('../actions/QuestionListActions.js');

 var keys = { Space: 32 };

var isBannerVisible = function(state){
    return state !== "running";
};

var _save = function(question, experimentId, userId){
    if (!question.__saved){
        AnswerActions.saveAnswer(question, experimentId, userId);
        question.__saved = true;
    }
};

var Question = React.createClass({
    getInitialState: function() {
        return {banner: "Space to Start", frame: 0, spriteLoaded: false};
    },
    componentWillReceiveProps: function(nextProps){
        var question = nextProps.question;
        var state = question.state;
        var elapsed = question.getElapsed();
        var frame = question.frame;
        var totalFrames = question.sprite.frames;

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
            QuestionActions.toggleQuestion(this.countdownChanged, this.frameChanged);

            var question = this.props.question;
            if (question.state === "done"){
                _save(question, this.props.experimentId, this.props.userId);
            }
        }
    },
    countdownChanged: function (secondsToStart){
        if (secondsToStart === 0){
            QuestionActions.startQuestion(this.frameChanged);
        }
        else {
            this.setState({ banner: "We will start in " + secondsToStart + " seconds" });
        }
    },
    frameChanged: function (frame){
        this.setState({frame: frame});
    },
    handlePrev: function(){
        QuestionListActions.prev();
        this.setState({spriteLoaded: false});
    },
    handleNext: function(){
        QuestionListActions.next();
        this.setState({spriteLoaded: false});
    },
    onSpriteLoad: function(args){
        console.log ("Sprite loaded in " + args.loadTime + " ms");
        this.setState({spriteLoaded: true});
    },
    render() {
        var canMoveNext = this.props.canMoveNext;
        var canMovePrev = this.props.canMovePrev;
        var banner = isBannerVisible(this.props.question.state) ?
             <Banner>
                <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'flex-start'}}>
                    <span style={{flexBasis: '10%'}} onClick={this.handlePrev}>{canMovePrev ? (<a href="#" className="arrow"><i className="glyphicon glyphicon-arrow-left"></i></a>) : ""}</span>
                    <span style={{flexBasis: '80%'}} className="banner-text">{this.state.banner}</span>
                    <span style={{flexBasis: '10%'}} onClick={this.handleNext}>{canMoveNext ? (<a href="#" className="arrow"><i className="glyphicon glyphicon-arrow-right"></i></a>) : ""}</span>
                </div>
             </Banner> :
             "";

        var loading = this.state.spriteLoaded ? "" : (<Loader />);

        var introText = this.props.question.introText;
        var sprite = this.props.question.sprite || {}; // TODO: default to Sprite?


        var containerStyle = {
            display: 'flex'
        };

        var centerStyle = {
            margin: 'auto',
            textAlign: 'center'
        };

        var opacity = !this.state.spriteLoaded ? 0 :
            (this.props.question.state === "done" ? 0.3 : 1);

        var filterOpacity = 100 * opacity;

        var spriteVisibility = {
            opacity: opacity,
            MozOpacity: opacity,
            KhtmlOpacity: opacity,
            filter: "alpha(opacity="+ filterOpacity +")" /* For IE8 and earlier */
        };

        return (
          <div className="question">
              {banner}
              
                <div style={containerStyle}>
                    <div style={centerStyle}>
                        {loading}
                        <div className="sprite" style={spriteVisibility}>

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
                        <h1 style={spriteVisibility}>
                            {introText}
                        </h1>
                    </div>

       
                </div>
          </div>
        );
    }
});

module.exports = Question;