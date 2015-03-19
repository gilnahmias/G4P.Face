/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Strings = require ('../strings/Experiment-en.js').startScreen;
var {Link} = require('react-router');

var getState = function(){
    return {
        userIdValid: false
    };
};

var keys = {
    Enter: 13
};

var containerLayout = {
    display: 'box',
    boxAlign: 'center',
    textAlign: 'center',
    width: '100%',
    marginTop: '12%'
};

var StartExperiment = React.createClass({
    //mixins: [ProbeStore.mixin],
    getInitialState: function() { return getState(); },
    //storeDidChange: function() { this.setState(getState()); },
    
    handleButtonClick() {
        var userId = this.refs.userId.getDOMNode().value;
        return this.state.userIdValid;
    },
    
    handleIdChange(){
        var userId = this.refs.userId.getDOMNode().value;
        this.setState({userIdValid: !!userId});
    },

    handleKeyUp(e){
        if (e.which === keys.Enter){
            this.refs.link.getDOMNode().click();
        }
    },
    
    componentDidMount(){
        this.refs.userId.getDOMNode().focus();
    },

    render() {
        var buttonTitle = this.state.userIdValid ?
            Strings.button.next :
            Strings.button.invalid;

        var buttonClass = this.state.userIdValid ?
            "btn btn-success" :
            "btn btn-default disabled";

        var idTextboxStyle = {
            fontSize: 24,
            textAlign: 'center'
        };

        var submitButtonStyle = {
            marginTop: 30,
            width: 200
        };

        return (<div className="container">
                    <div style={containerLayout} className="row form-group">
                        <div className="col-md-offset-4 col-md-6 col-xs-12">
                            <h1>{Strings.whoAreYou}</h1>
                            <div><input className="form-control" style={idTextboxStyle} ref="userId" type="email" placeholder={Strings.insertYourId} onChange={this.handleIdChange} onKeyUp={this.handleKeyUp} autofocus /></div>
                            <Link ref="link" to="probe" className={buttonClass} style={submitButtonStyle} onClick={this.handleButtonClick}>{buttonTitle}</Link>
                        </div>
                    </div>
                </div>);
    }
});

module.exports = StartExperiment;