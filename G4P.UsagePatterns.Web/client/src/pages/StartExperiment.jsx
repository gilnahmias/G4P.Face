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
        alert(userId);

        return this.state.userIdValid;
    },
    
    handleIdChange(){
        var userId = this.refs.userId.getDOMNode().value;
        this.setState({userIdValid: !!userId});
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

        return (<div className="container">
                    <div style={containerLayout} className="row form-group">
                        <div className="col-md-offset-4 col-md-6 col-xs-12">
                            <h1>{Strings.whoAreYou}</h1>
                            <div><input className="form-control" ref="userId" type="email" placeholder={Strings.insertYourId} onChange={this.handleIdChange} autofocus /></div>
                            <Link to="probe" className={buttonClass} onClick={this.handleButtonClick}>{buttonTitle}</Link>
                        </div>
                    </div>
                </div>);
    }
});

module.exports = StartExperiment;