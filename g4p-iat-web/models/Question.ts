import Sprite = require ('./Sprite');

'use strict';

class Question {
    private _id:string;
    private _spriteId:string;
    private _sprite:Sprite;
    private _introImageUrl:string;
    private _introTexts;
    private _state:string = "not started"; // "countdown", "running", "done"
    private _onStateChanged = null;
    private _frame:number = 0;
    private _frameDuration:number = 16; // 16ms = 60fps
    private _startedAt = 0;
    private _endedAt = 0;

    constructor(id:string, spriteId:string, introImageUrl:string, introTexts) {
        this._id = id;
        this._spriteId = spriteId;
        this._introImageUrl = introImageUrl;
        this._introTexts = introTexts;
        this._sprite = new Sprite("sp3", "sprites/15x40/sprite-arab-angry-smile-small.jpg", 7680, 15360, 40, 15, 600);
    }

    static fromJS(question){
        return new Question(
            question._id,
            question._spriteId,
            question._introImageUrl,
            question._introTexts
        );
    }

    get id(){
        return this._id;
    }

    get spriteId(){
        return this._spriteId;
    }

    get sprite(){
        return this._sprite;
    }

    set sprite(sprite){
        // TODO - repo
        this._sprite = sprite;
    }

    get introImageUrl(){
        return this._introImageUrl;
    }

    get introTexts(){
        return this._introTexts;
    }

    get state(){
        return this._state;
    }

    get onStateChanged(){
        return this._onStateChanged;
    }

    set onStateChanged(onStateChanged){
        this._onStateChanged = onStateChanged;
    }

    countdown(callback, secondsToStart?:number){
        if (this._state !== "not started" && this._state !== "countdown" ){
            // the only two allowed states to start a countdown are "not started" and "in the middle of a countdown"
            return;
        }

        this._setState("countdown");

        if (secondsToStart === undefined){
            this.countdown.call(this, callback, 3);
            return;
        }

        callback(secondsToStart);

        if (secondsToStart === 0){
            return;
        }
        
        setTimeout(this.countdown.bind(this, callback, secondsToStart - 1), 1000);
    }

    nextFrame(){
        ++this._frame;
    }

    start(animationCallback){
        this._startedAt = performance.now();
        this._setState("running");
        this.animate(animationCallback);
    }

    stop(){
        this._endedAt = performance.now();
        this._setState("done");

        //this.save();
    }

    elapsed(){
        if (this._state === "running"){
            return performance.now() - this._startedAt;
        }

        if (this._state === "done"){
            return this._endedAt - this._startedAt;
        }
    }

    toggle(countdownCallback, animationCallback){
        switch (this._state){
            case "not started": this.countdown(countdownCallback); return;
            case "countdown": this.start(animationCallback); return;
            case "running": this.stop(); return;
        }
    }

    animate(callback, frameNumber?:number){
        if (this._state !== "running"){
            return;
        }

        if (frameNumber === undefined){
            frameNumber = 0;
        }

        this._frame = frameNumber;
        callback(this._frame);

        if (this._frame < this._sprite.frames){
            setTimeout(this.animate.bind(this, callback, frameNumber + 1), this._frameDuration);
        }
    }

    _setState(state:string){
        var before = this._state;
        this._state = state;
        var after = this._state;

        if (typeof this._onStateChanged === "function" && before !== after){
            this._onStateChanged.call(this, after, before);
        }
    }
}

export = Question;