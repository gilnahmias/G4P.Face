'use strict';

var Probe = function(sprite){
    this._id = guidGenerator();
    this._state = "not started"; // "countdown", "running", "done"
    this._sprite = sprite;
    this._frame = 0;
    this._frameDuration = 200;
};

Probe.prototype.getSprite = function(){
    return this._sprite;
};

Probe.prototype.getState = function(){
    return this._state;
};

Probe.prototype.getFrame = function(){
    return this._frame;
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

Probe.prototype.nextFrame = function(){
    ++this._frame;
};

Probe.prototype.start = function(animationCallback){
    this._startedAt = window.performance.now();
    this._state = "running";
    this.animate(animationCallback);
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

Probe.prototype.toggle = function(countdownCallback, animationCallback){
    switch (this._state){
        case "not started": this.countdown(countdownCallback); return;
        case "countdown": this.start(animationCallback); return;
        case "running": this.stop(); return;
    }
};

Probe.prototype.animate = function(callback, frameNumber){
    if (this._state !== "running"){
        return;
    }

    if (frameNumber === undefined){
        frameNumber = 0;
    }

    this._frame = frameNumber;
    callback(this._frame);

    setTimeout(this.animate.bind(this, callback, frameNumber + 1), this._frameDuration);
};

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
module.exports = Probe;