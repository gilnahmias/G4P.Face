var Sprite = require('./Sprite');
'use strict';
var Question = (function () {
    function Question(id, spriteId, introImageUrl, introText) {
        this._state = "not started"; // "countdown", "running", "done"
        this._onStateChanged = null;
        this._frame = 0;
        this._frameDuration = 16; // 16ms = 60fps
        this._startedAt = 0;
        this._endedAt = 0;
        this._id = id;
        this._spriteId = spriteId;
        this._introImageUrl = introImageUrl;
        this._introText = introText;
        this._sprite = new Sprite("sp3", "sprites/15x40/sprite-arab-angry-smile-small.jpg", 7680, 15360, 40, 15, 600);
    }
    Question.fromJS = function (question) {
        return new Question(question._id, question._spriteId, question._introImageUrl, question._introText);
    };
    Object.defineProperty(Question.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Question.prototype, "spriteId", {
        get: function () {
            return this._spriteId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Question.prototype, "sprite", {
        get: function () {
            return this._sprite;
        },
        set: function (sprite) {
            // TODO - repo
            this._sprite = sprite;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Question.prototype, "introImageUrl", {
        get: function () {
            return this._introImageUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Question.prototype, "introText", {
        get: function () {
            return this._introText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Question.prototype, "frame", {
        get: function () {
            return this._frame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Question.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Question.prototype, "onStateChanged", {
        get: function () {
            return this._onStateChanged;
        },
        set: function (onStateChanged) {
            this._onStateChanged = onStateChanged;
        },
        enumerable: true,
        configurable: true
    });
    Question.prototype.countdown = function (callback, secondsToStart) {
        if (this._state !== "not started" && this._state !== "countdown") {
            // the only two allowed states to start a countdown are "not started" and "in the middle of a countdown"
            return;
        }
        this._setState("countdown");
        if (secondsToStart === undefined) {
            this.countdown.call(this, callback, 3);
            return;
        }
        callback(secondsToStart);
        if (secondsToStart === 0) {
            return;
        }
        setTimeout(this.countdown.bind(this, callback, secondsToStart - 1), 1000);
    };
    Question.prototype.nextFrame = function () {
        ++this._frame;
    };
    Question.prototype.start = function (animationCallback) {
        this._startedAt = performance.now();
        this._setState("running");
        this.animate(animationCallback);
    };
    Question.prototype.stop = function () {
        this._endedAt = performance.now();
        this._setState("done");
        //this.save();
    };
    Question.prototype.getElapsed = function () {
        if (this._state === "running") {
            return performance.now() - this._startedAt;
        }
        if (this._state === "done") {
            return this._endedAt - this._startedAt;
        }
    };
    Question.prototype.toggle = function (countdownCallback, animationCallback) {
        switch (this._state) {
            case "not started":
                this.countdown(countdownCallback);
                return;
            case "countdown":
                this.start(animationCallback);
                return;
            case "running":
                this.stop();
                return;
        }
    };
    Question.prototype.animate = function (callback, frameNumber) {
        if (this._state !== "running") {
            return;
        }
        if (frameNumber === undefined) {
            frameNumber = 0;
        }
        this._frame = frameNumber;
        callback(this._frame);
        if (this._frame < this._sprite.frames) {
            setTimeout(this.animate.bind(this, callback, frameNumber + 1), this._frameDuration);
        }
    };
    Question.prototype._setState = function (state) {
        var before = this._state;
        this._state = state;
        var after = this._state;
        if (typeof this._onStateChanged === "function" && before !== after) {
            this._onStateChanged.call(this, after, before);
        }
    };
    return Question;
})();
module.exports = Question;
