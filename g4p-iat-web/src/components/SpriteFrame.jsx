/**
 * @jsx React.DOM
 */

'use strict';
var React = require('react');

var getState = function(){
    var frame = Math.min(this.props.frame, this.props.totalFrames - 1);

    var rowHeight = this.props.height / this.props.rows;
    var row = Math.floor(frame / this.props.cols);
    var y = row * rowHeight;

    var colWidth = this.props.width / this.props.cols;
    var col = frame - row * this.props.cols;
    var x = col * colWidth;

    var width = this.props.width / this.props.cols;
    var height = this.props.height / this.props.rows;

    return { width: width, height: height, x: x, y: y};
};

var _initTimestamp = Date.now();

var SpriteFrame = React.createClass({
    propTypes: {
        imageUrl: React.PropTypes.string,
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        rows: React.PropTypes.number,
        cols: React.PropTypes.number,
        frame: React.PropTypes.number,
        totalFrames: React.PropTypes.number
    },
    getInitialState: function(){
        return getState.call(this);
    },
    componentWillReceiveProps: function(){
        this.setState(getState.call(this));
    },
    onSpriteLoad: function(e){
        var loadTime = e.timeStamp - _initTimestamp;

        if (typeof this.props.onLoad === "function"){
            this.props.onLoad({loadTime: loadTime});
        }
    },
    render() {
        _initTimestamp = Date.now();

        var containerStyle = {
            width: this.state.width,
            height: this.state.height,
            overflow: 'hidden'
        };

        var imageStyle = {
            transform: 'translateZ(0) translateY(-' + this.state.y + 'px) translateX(-' + this.state.x + 'px)'
        };

        return (<div style={containerStyle}>
                    <img style={imageStyle} src={this.props.imageUrl} onLoad={this.onSpriteLoad} />
                </div>);
    }
});

module.exports = SpriteFrame;