/**
 * @jsx React.DOM
 */

'use strict';
var React = require('react');

var getImageStyle = function (props){

    var rowHeight = props.height / props.rows;
    var row = Math.floor(props.frame / props.cols);
    var y = row * rowHeight;

    var col = props.frame - row * props.cols;
    var colWidth = props.width / props.cols;
    var x = col * colWidth;

    return {
            transform: 'translateZ(0) translateY(-' + y + 'px) translateX(-' + x + 'px)'
        };
};

var getContainerStyle = function (props){
        return {
            width: props.width / props.cols,
            height: props.height / props.rows,
            overflow: 'hidden'
        };
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
    render() {
        return (<div style={getContainerStyle(this.props)}>
                    <img style={getImageStyle(this.props)} src={this.props.imageUrl} />
                </div>);
    }
});

module.exports = SpriteFrame;