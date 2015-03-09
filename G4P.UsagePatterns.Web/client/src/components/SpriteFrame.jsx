/**
 * @jsx React.DOM
 */

'use strict';
var React = require('react');

var getState = function(){
    var rowHeight = this.props.height / this.props.rows;
    var row = Math.floor(this.props.frame / this.props.cols);
    var y = row * rowHeight;

    var colWidth = this.props.width / this.props.cols;
    var col = this.props.frame - row * this.props.cols;
    var x = col * colWidth;

    var width = this.props.width / this.props.cols;
    var height = this.props.height / this.props.rows;

    return { width: width, height: height, x: x, y: y};
};

var SpriteFrame = React.createClass({
    propTypes: {
        imageUrl: React.PropTypes.string,
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        rows: React.PropTypes.number,
        cols: React.PropTypes.number,
        frame: React.PropTypes.number
    },
    getInitialState: function(){
        return getState.call(this);
    },
    componentWillReceiveProps: function(){
        this.setState(getState.call(this));
    },
    render() {
        var containerStyle = {
            width: this.state.width,
            height: this.state.height,
            overflow: 'hidden'
        };

        var imageStyle = {
            transform: 'translateZ(0) translateY(-' + this.state.y + 'px) translateX(-' + this.state.x + 'px)'
        };

        return (<div style={containerStyle}>
                    <img style={imageStyle} src={this.props.imageUrl} />
                </div>);
    }
});

module.exports = SpriteFrame;