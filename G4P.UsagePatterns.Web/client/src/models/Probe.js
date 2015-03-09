'use strict';

var Probe = function(){
    this._id = guidGenerator();
    this._state = "not started"; // "countdown", "running", "done"
};

Probe.prototype.countdown = function(callback, secondsToStart){
    if (this._state !== "not started" && this._state !== "countdown" ){
        // the only two allowed states to start a countdown are "not started" and "in the middle of a countdown"
        return;
    }

    this._state = "countdown";

    if (secondsToStart === undefined){
        this.countdown.call(this, callback, 3);
        return;
    }

    callback(secondsToStart);

    if (secondsToStart === 0){
        return;
    }
    
    setTimeout(this.countdown.bind(this, callback, secondsToStart - 1), 1000);
};

Probe.prototype.start = function(){
    this._startedAt = window.performance.now();
    this._state = "running";
};

Probe.prototype.stop = function(){
    this._endedAt = window.performance.now();
    this._state = "done";
};

Probe.prototype.elapsed = function(){
    if (this._state === "running"){
        return window.performance.now() - this._startedAt;
    }

    if (this._state === "done"){
        return this._endedAt - this._startedAt;
    }
};

Probe.prototype.toggle = function(countdownCallback){
    switch (this._state){
        case "not started": this.countdown(countdownCallback); return;
        case "countdown": this.start(); return;
        case "running": this.stop(); return;
    }
};

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
module.exports = Probe;