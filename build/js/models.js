var Sprite = (function () {
    function Sprite(id, url, width, height, rows, cols, frames) {
        this._id = id;
        this._url = url;
        this._width = width;
        this._height = height;
        this._rows = rows;
        this._cols = cols;
        this._frames = frames;
    }
    Object.defineProperty(Sprite.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "cols", {
        get: function () {
            return this._cols;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "frames", {
        get: function () {
            return this._frames;
        },
        enumerable: true,
        configurable: true
    });
    return Sprite;
})();
module.exports = Sprite;

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

var Answer = (function () {
    function Answer(id, timestamp, frame, duration, userId, machineId, questionId, experimentId) {
        this._id = id;
        this._timestamp = timestamp;
        this._frame = frame;
        this._duration = duration;
        this._userId = userId;
        this._machineId = machineId;
        this._questionId = questionId;
        this._experimentId = experimentId;
    }
    Answer.fromQuestion = function (question, experimentId, userId) {
        var createId = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return new Answer(createId(), new Date(), question.frame, question.getElapsed(), userId, "machine-id", question.id, experimentId);
    };
    Object.defineProperty(Answer.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Answer.prototype, "timestamp", {
        get: function () {
            return this._timestamp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Answer.prototype, "frame", {
        get: function () {
            return this._frame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Answer.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Answer.prototype, "userId", {
        get: function () {
            return this._userId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Answer.prototype, "machineId", {
        get: function () {
            return this._machineId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Answer.prototype, "questionId", {
        get: function () {
            return this._questionId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Answer.prototype, "experimentId", {
        get: function () {
            return this._experimentId;
        },
        enumerable: true,
        configurable: true
    });
    return Answer;
})();
module.exports = Answer;

var Browser = (function () {
    function Browser(id, type, version, isMobile, externalIP, internalIP) {
        this._id = id;
        this._type = type;
        this._version = version;
        this._isMobile = isMobile;
        this._externalIP = externalIP;
        this._internalIP = internalIP;
    }
    Object.defineProperty(Browser.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "isMobile", {
        get: function () {
            return this._isMobile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "externalIP", {
        get: function () {
            return this._externalIP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "internalIP", {
        get: function () {
            return this._internalIP;
        },
        enumerable: true,
        configurable: true
    });
    return Browser;
})();
module.exports = Browser;

var Question = require('./Question');
var ExperimentTemplate = (function () {
    function ExperimentTemplate(id, name, questions) {
        this._id = id;
        this._name = name;
        this._questions = questions;
    }
    ExperimentTemplate.fromJS = function (template) {
        var questions = template._questions.map(function (question) {
            return Question.fromJS(question);
        });
        return new ExperimentTemplate(template._id, template._name, questions);
    };
    Object.defineProperty(ExperimentTemplate.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExperimentTemplate.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExperimentTemplate.prototype, "questions", {
        get: function () {
            return this._questions;
        },
        enumerable: true,
        configurable: true
    });
    return ExperimentTemplate;
})();
module.exports = ExperimentTemplate;

var ExperimentTemplate = require('./ExperimentTemplate');
var Experiment = (function () {
    function Experiment(id, facilitators, tags, startTime, template) {
        this._id = id;
        this._facilitators = facilitators;
        this._tags = tags;
        this._startTime = startTime;
        this._template = template;
        this._answers = [];
    }
    Experiment.fromJS = function (exp) {
        return new Experiment(exp._id, exp._facilitators, exp._tags, exp._startTime, ExperimentTemplate.fromJS(exp._template));
    };
    Object.defineProperty(Experiment.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Experiment.prototype, "facilitators", {
        get: function () {
            return this._facilitators;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Experiment.prototype, "tags", {
        get: function () {
            return this._tags;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Experiment.prototype, "startTime", {
        get: function () {
            return this._startTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Experiment.prototype, "template", {
        get: function () {
            return this._template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Experiment.prototype, "answers", {
        get: function () {
            return this._answers;
        },
        enumerable: true,
        configurable: true
    });
    Experiment.prototype.addAnswer = function (answer) {
        this._answers.push(answer);
    };
    return Experiment;
})();
module.exports = Experiment;

var IdGenerator = (function () {
    function IdGenerator() {
    }
    IdGenerator.newId = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return IdGenerator;
})();
module.exports = IdGenerator;

'use strict';
var QuestionList = (function () {
    function QuestionList(questions, onDone) {
        this._currentIndex = -1;
        this._onDone = null;
        this._questions = [];
        this._onDone = onDone;
        if (!questions) {
            return;
        }
        questions.forEach(function (question) {
            this.add(question);
        }, this);
    }
    QuestionList.prototype.add = function (question) {
        var self = this;
        question.onStateChanged = function () {
            if (typeof self._onDone === "function" && self.areAllStates("done")) {
                self._onDone.call(this);
            }
        };
        this._questions.push(question);
    };
    QuestionList.prototype.getCurrent = function () {
        if (this._currentIndex === -1 && this._questions.length > 0) {
            this._currentIndex = 0;
        }
        if (this._currentIndex === -1) {
            return null;
        }
        return this._questions[this._currentIndex];
    };
    QuestionList.prototype.next = function () {
        if (this.canMoveNext()) {
            ++this._currentIndex;
        }
    };
    QuestionList.prototype.prev = function () {
        if (this.canMovePrev()) {
            --this._currentIndex;
        }
    };
    QuestionList.prototype.canMoveNext = function () {
        return this._questions.length > 0 && this._currentIndex < this._questions.length - 1;
    };
    QuestionList.prototype.canMovePrev = function () {
        return this._questions.length > 0 && this._currentIndex > 0;
    };
    QuestionList.prototype.length = function () {
        return this._questions.length;
    };
    QuestionList.prototype.areAllStates = function (state) {
        return this._questions.every(function (question) {
            return question.state === state;
        });
    };
    return QuestionList;
})();
module.exports = QuestionList;

var User = (function () {
    function User(id) {
        this._id = id;
    }
    Object.defineProperty(User.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    return User;
})();
module.exports = User;

var Experiment = require('../models/Experiment');
var Sprite = require('../models/Sprite');
var ExperimentRepository = (function () {
    function ExperimentRepository() {
        this._sprites = {};
        this._sprites = {
            "s1": new Sprite("s1", "sprites/15x40/sprite-arab-angry-smile-small.jpg", 7680, 15360, 40, 15, 600),
            "s2": new Sprite("s2", "sprites/15x40/sprite-arab-angry-smile-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            "s3": new Sprite("s3", "sprites/15x40/sprite-arab-smile-angry-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            "s4": new Sprite("s4", "sprites/15x40/sprite-arab-smile-angry-small.jpg", 7680, 15360, 40, 15, 600),
            "s5": new Sprite("s5", "sprites/15x40/sprite-jew-angry-smile-small.jpg", 7680, 15360, 40, 15, 600),
            "s6": new Sprite("s6", "sprites/15x40/sprite-jew-angry-smile-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            "s7": new Sprite("s7", "sprites/15x40/sprite-jew-smile-angry-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            "s8": new Sprite("s8", "sprites/15x40/sprite-jew-smile-angry-small.jpg", 7680, 15360, 40, 15, 600)
        };
    }
    ExperimentRepository.prototype.fetch = function () {
        // fake\
        var sprites = this._sprites;
        return $.when(true).then(function () {
            var experiment = Experiment.fromJS(ExperimentRepository._fakeExperiment);
            // TODO: repositoryy
            experiment.template.questions.forEach(function (question) {
                question.sprite = sprites[question.spriteId];
            }, this);
            return experiment;
        });
        // real
        return $.getJSON("experiments/").then(function (experiments) {
            var first = experiments[0];
            return Experiment.fromJS(first);
        }).fail(function () {
            debugger;
            return Experiment.fromJS(ExperimentRepository._fakeExperiment);
        });
    };
    ExperimentRepository._fakeExperiment = { "_id": "e1", "_facilitators": ["gil"], "_tags": ["test"], "_startTime": "2015-04-13T00:25:52.937Z", "_template": { "_id": "et1", "_name": "test", "_questions": [{ "_state": "not started", "_onStateChanged": null, "_frame": 0, "_frameDuration": 16, "_startedAt": 0, "_endedAt": 0, "_id": "q1", "_spriteId": "s2", "_introImageUrl": "", "_introText": "Muhammad", "_sprite": { "_id": "sp3", "_url": "sprites/15x40/sprite-arab-angry-smile-small.jpg", "_width": 7680, "_height": 15360, "_rows": 40, "_cols": 15, "_frames": 600 } }, { "_state": "not started", "_onStateChanged": null, "_frame": 0, "_frameDuration": 16, "_startedAt": 0, "_endedAt": 0, "_id": "q2", "_spriteId": "s4", "_introImageUrl": "", "_introText": "Muhammad", "_sprite": { "_id": "sp3", "_url": "sprites/15x40/sprite-arab-angry-smile-small.jpg", "_width": 7680, "_height": 15360, "_rows": 40, "_cols": 15, "_frames": 600 } }, { "_state": "not started", "_onStateChanged": null, "_frame": 0, "_frameDuration": 16, "_startedAt": 0, "_endedAt": 0, "_id": "q3", "_spriteId": "s7", "_introImageUrl": "", "_introText": "Avi", "_sprite": { "_id": "sp3", "_url": "sprites/15x40/sprite-arab-angry-smile-small.jpg", "_width": 7680, "_height": 15360, "_rows": 40, "_cols": 15, "_frames": 600 } }, { "_state": "not started", "_onStateChanged": null, "_frame": 0, "_frameDuration": 16, "_startedAt": 0, "_endedAt": 0, "_id": "q4", "_spriteId": "s8", "_introImageUrl": "", "_introText": "Avi", "_sprite": { "_id": "sp3", "_url": "sprites/15x40/sprite-arab-angry-smile-small.jpg", "_width": 7680, "_height": 15360, "_rows": 40, "_cols": 15, "_frames": 600 } }] }, "_answers": [] };
    return ExperimentRepository;
})();
module.exports = ExperimentRepository;

var QuestionRepository = (function () {
    function QuestionRepository() {
    }
    QuestionRepository.prototype.save = function (question) {
        alert('1111111111');
        $.post("questions/", question);
    };
    QuestionRepository.prototype.notify = function () {
        alert("no teeeee fy");
    };
    QuestionRepository.prototype.return1 = function () {
        return 1;
    };
    return QuestionRepository;
})();
module.exports = QuestionRepository;

var Sprite = require("../models/Sprite");
var SpriteRepository = (function () {
    function SpriteRepository() {
    }
    SpriteRepository.prototype.get = function (spriteId) {
        var sprites = {
            "sp1": new Sprite("sp1", "sprites/15x40/sprite-arab-angry-smile-small.jpg", 7680, 15360, 40, 15, 600),
            "sp2": new Sprite("sp2", "sprites/15x40/sprite-arab-angry-smile-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            "sp3": new Sprite("sp3", "sprites/15x40/sprite-arab-smile-angry-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            "sp4": new Sprite("sp4", "sprites/15x40/sprite-arab-smile-angry-small.jpg", 7680, 15360, 40, 15, 600),
            "sp5": new Sprite("sp5", "sprites/15x40/sprite-jew-angry-smile-small.jpg", 7680, 15360, 40, 15, 600),
            "sp6": new Sprite("sp6", "sprites/15x40/sprite-jew-angry-smile-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            "sp7": new Sprite("sp7", "sprites/15x40/sprite-jew-smile-angry-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            "sp8": new Sprite("sp8", "sprites/15x40/sprite-jew-smile-angry-small.jpg", 7680, 15360, 40, 15, 600)
        };
        return sprites[spriteId];
    };
    return SpriteRepository;
})();
module.exports = SpriteRepository;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L0dpbC9EZXYvRzRQLkZhY2UvbW9kZWxzL1Nwcml0ZS50cyIsIkM6L0dpbC9EZXYvRzRQLkZhY2UvbW9kZWxzL1F1ZXN0aW9uLnRzIiwiQzovR2lsL0Rldi9HNFAuRmFjZS9tb2RlbHMvQW5zd2VyLnRzIiwiQzovR2lsL0Rldi9HNFAuRmFjZS9tb2RlbHMvQnJvd3Nlci50cyIsIkM6L0dpbC9EZXYvRzRQLkZhY2UvbW9kZWxzL0V4cGVyaW1lbnRUZW1wbGF0ZS50cyIsIkM6L0dpbC9EZXYvRzRQLkZhY2UvbW9kZWxzL0V4cGVyaW1lbnQudHMiLCJDOi9HaWwvRGV2L0c0UC5GYWNlL21vZGVscy9JZEdlbmVyYXRvci50cyIsIkM6L0dpbC9EZXYvRzRQLkZhY2UvbW9kZWxzL1F1ZXN0aW9uTGlzdC50cyIsIkM6L0dpbC9EZXYvRzRQLkZhY2UvbW9kZWxzL1VzZXIudHMiLCJDOi9HaWwvRGV2L0c0UC5GYWNlL3JlcG9zaXRvcmllcy9FeHBlcmltZW50UmVwb3NpdG9yeS50cyIsIkM6L0dpbC9EZXYvRzRQLkZhY2UvcmVwb3NpdG9yaWVzL1F1ZXN0aW9uUmVwb3NpdG9yeS50cyIsIkM6L0dpbC9EZXYvRzRQLkZhY2UvcmVwb3NpdG9yaWVzL1Nwcml0ZVJlcG9zaXRvcnkudHMiXSwibmFtZXMiOlsiU3ByaXRlIiwiU3ByaXRlLmNvbnN0cnVjdG9yIiwiU3ByaXRlLmlkIiwiU3ByaXRlLnVybCIsIlNwcml0ZS53aWR0aCIsIlNwcml0ZS5oZWlnaHQiLCJTcHJpdGUucm93cyIsIlNwcml0ZS5jb2xzIiwiU3ByaXRlLmZyYW1lcyIsIlF1ZXN0aW9uIiwiUXVlc3Rpb24uY29uc3RydWN0b3IiLCJRdWVzdGlvbi5mcm9tSlMiLCJRdWVzdGlvbi5pZCIsIlF1ZXN0aW9uLnNwcml0ZUlkIiwiUXVlc3Rpb24uc3ByaXRlIiwiUXVlc3Rpb24uaW50cm9JbWFnZVVybCIsIlF1ZXN0aW9uLmludHJvVGV4dCIsIlF1ZXN0aW9uLmZyYW1lIiwiUXVlc3Rpb24uc3RhdGUiLCJRdWVzdGlvbi5vblN0YXRlQ2hhbmdlZCIsIlF1ZXN0aW9uLmNvdW50ZG93biIsIlF1ZXN0aW9uLm5leHRGcmFtZSIsIlF1ZXN0aW9uLnN0YXJ0IiwiUXVlc3Rpb24uc3RvcCIsIlF1ZXN0aW9uLmdldEVsYXBzZWQiLCJRdWVzdGlvbi50b2dnbGUiLCJRdWVzdGlvbi5hbmltYXRlIiwiUXVlc3Rpb24uX3NldFN0YXRlIiwiQW5zd2VyIiwiQW5zd2VyLmNvbnN0cnVjdG9yIiwiQW5zd2VyLmZyb21RdWVzdGlvbiIsIkFuc3dlci5pZCIsIkFuc3dlci50aW1lc3RhbXAiLCJBbnN3ZXIuZnJhbWUiLCJBbnN3ZXIuZHVyYXRpb24iLCJBbnN3ZXIudXNlcklkIiwiQW5zd2VyLm1hY2hpbmVJZCIsIkFuc3dlci5xdWVzdGlvbklkIiwiQW5zd2VyLmV4cGVyaW1lbnRJZCIsIkJyb3dzZXIiLCJCcm93c2VyLmNvbnN0cnVjdG9yIiwiQnJvd3Nlci5pZCIsIkJyb3dzZXIudHlwZSIsIkJyb3dzZXIudmVyc2lvbiIsIkJyb3dzZXIuaXNNb2JpbGUiLCJCcm93c2VyLmV4dGVybmFsSVAiLCJCcm93c2VyLmludGVybmFsSVAiLCJFeHBlcmltZW50VGVtcGxhdGUiLCJFeHBlcmltZW50VGVtcGxhdGUuY29uc3RydWN0b3IiLCJFeHBlcmltZW50VGVtcGxhdGUuZnJvbUpTIiwiRXhwZXJpbWVudFRlbXBsYXRlLmlkIiwiRXhwZXJpbWVudFRlbXBsYXRlLm5hbWUiLCJFeHBlcmltZW50VGVtcGxhdGUucXVlc3Rpb25zIiwiRXhwZXJpbWVudCIsIkV4cGVyaW1lbnQuY29uc3RydWN0b3IiLCJFeHBlcmltZW50LmZyb21KUyIsIkV4cGVyaW1lbnQuaWQiLCJFeHBlcmltZW50LmZhY2lsaXRhdG9ycyIsIkV4cGVyaW1lbnQudGFncyIsIkV4cGVyaW1lbnQuc3RhcnRUaW1lIiwiRXhwZXJpbWVudC50ZW1wbGF0ZSIsIkV4cGVyaW1lbnQuYW5zd2VycyIsIkV4cGVyaW1lbnQuYWRkQW5zd2VyIiwiSWRHZW5lcmF0b3IiLCJJZEdlbmVyYXRvci5jb25zdHJ1Y3RvciIsIklkR2VuZXJhdG9yLm5ld0lkIiwiUXVlc3Rpb25MaXN0IiwiUXVlc3Rpb25MaXN0LmNvbnN0cnVjdG9yIiwiUXVlc3Rpb25MaXN0LmFkZCIsIlF1ZXN0aW9uTGlzdC5nZXRDdXJyZW50IiwiUXVlc3Rpb25MaXN0Lm5leHQiLCJRdWVzdGlvbkxpc3QucHJldiIsIlF1ZXN0aW9uTGlzdC5jYW5Nb3ZlTmV4dCIsIlF1ZXN0aW9uTGlzdC5jYW5Nb3ZlUHJldiIsIlF1ZXN0aW9uTGlzdC5sZW5ndGgiLCJRdWVzdGlvbkxpc3QuYXJlQWxsU3RhdGVzIiwiVXNlciIsIlVzZXIuY29uc3RydWN0b3IiLCJVc2VyLmlkIiwiRXhwZXJpbWVudFJlcG9zaXRvcnkiLCJFeHBlcmltZW50UmVwb3NpdG9yeS5jb25zdHJ1Y3RvciIsIkV4cGVyaW1lbnRSZXBvc2l0b3J5LmZldGNoIiwiUXVlc3Rpb25SZXBvc2l0b3J5IiwiUXVlc3Rpb25SZXBvc2l0b3J5LmNvbnN0cnVjdG9yIiwiUXVlc3Rpb25SZXBvc2l0b3J5LnNhdmUiLCJRdWVzdGlvblJlcG9zaXRvcnkubm90aWZ5IiwiUXVlc3Rpb25SZXBvc2l0b3J5LnJldHVybjEiLCJTcHJpdGVSZXBvc2l0b3J5IiwiU3ByaXRlUmVwb3NpdG9yeS5jb25zdHJ1Y3RvciIsIlNwcml0ZVJlcG9zaXRvcnkuZ2V0Il0sIm1hcHBpbmdzIjoiQUFBQSxJQUFNLE1BQU07SUFTUkEsU0FURUEsTUFBTUEsQ0FTSUEsRUFBU0EsRUFBRUEsR0FBVUEsRUFBRUEsS0FBWUEsRUFBRUEsTUFBYUEsRUFBRUEsSUFBV0EsRUFBRUEsSUFBV0EsRUFBRUEsTUFBYUE7UUFDbkdDLElBQUlBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBO1FBQ2RBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLEdBQUdBLENBQUNBO1FBQ2hCQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUNwQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsTUFBTUEs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LElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLENBQUNBO1lBQ3pHQSxJQUFJQSxFQUFFQSxJQUFJQSxNQUFNQSxDQUFDQSxJQUFJQSxFQUFFQSx1REFBdURBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLENBQUNBO1lBQ3pHQSxJQUFJQSxFQUFFQSxJQUFJQSxNQUFNQSxDQUFDQSxJQUFJQSxFQUFFQSxpREFBaURBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLENBQUNBO1lBQ25HQSxJQUFJQSxFQUFFQSxJQUFJQSxNQUFNQSxDQUFDQSxJQUFJQSxFQUFFQSxnREFBZ0RBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLENBQUNBO1lBQ2xHQSxJQUFJQSxFQUFFQSxJQUFJQSxNQUFNQSxDQUFDQSxJQUFJQSxFQUFFQSxzREFBc0RBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLENBQUNBO1lBQ3hHQSxJQUFJQSxFQUFFQSxJQUFJQSxNQUFNQSxDQUFDQSxJQUFJQSxFQUFFQSxzREFBc0RBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLENBQUNBO1lBQ3hHQSxJQUFJQSxFQUFFQSxJQUFJQSxNQUFNQSxDQUFDQSxJQUFJQSxFQUFFQSxnREFBZ0RBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEdBQUdBLENBQUNBO1NBQ3JHQSxDQUFDQTtJQUNOQSxDQUFDQTtJQUVERCxvQ0FBS0EsR0FBTEE7UUFDSUUsQUFDQUEsUUFEUUE7WUFDSkEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7UUFDNUJBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLENBQUNBO1lBQ3JCLElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDeEUsQUFDRCxvQkFEcUI7WUFDckIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVMsUUFBUTtnQkFDbkQsUUFBUSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVULE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDdEIsQ0FBQyxDQUFDQSxDQUFDQTtRQUVIQSxBQUNBQSxPQURPQTtRQUNQQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFFQSxjQUFjQSxDQUFDQSxDQUM1QkEsSUFBSUEsQ0FBQ0EsVUFBU0EsV0FBV0E7WUFDdEIsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQ0EsQ0FDREEsSUFBSUEsQ0FBQ0E7WUFFVixRQUFRLENBQUM7WUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUNBLENBQUNBO0lBQ1hBLENBQUNBO0lBekNjRixvQ0FBZUEsR0FBR0EsRUFBQ0EsS0FBS0EsRUFBQ0EsSUFBSUEsRUFBQ0EsZUFBZUEsRUFBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBQ0EsT0FBT0EsRUFBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsRUFBQ0EsWUFBWUEsRUFBQ0EsMEJBQTBCQSxFQUFDQSxXQUFXQSxFQUFDQSxFQUFDQSxLQUFLQSxFQUFDQSxLQUFLQSxFQUFDQSxPQUFPQSxFQUFDQSxNQUFNQSxFQUFDQSxZQUFZQSxFQUFDQSxDQUFDQSxFQUFDQSxRQUFRQSxFQUFDQSxhQUFhQSxFQUFDQSxpQkFBaUJBLEVBQUNBLElBQUlBLEVBQUNBLFFBQVFBLEVBQUNBLENBQUNBLEVBQUNBLGdCQUFnQkEsRUFBQ0EsRUFBRUEsRUFBQ0EsWUFBWUEsRUFBQ0EsQ0FBQ0EsRUFBQ0EsVUFBVUEsRUFBQ0EsQ0FBQ0EsRUFBQ0EsS0FBS0EsRUFBQ0EsSUFBSUEsRUFBQ0EsV0FBV0EsRUFBQ0EsSUFBSUEsRUFBQ0EsZ0JBQWdCQSxFQUFDQSxFQUFFQSxFQUFDQSxZQUFZQSxFQUFDQSxVQUFVQSxFQUFDQSxTQUFTQSxFQUFDQSxFQUFDQSxLQUFLQSxFQUFDQSxLQUFLQSxFQUFDQSxNQUFNQSxFQUFDQSxpREFBaURBLEVBQUNBLFFBQVFBLEVBQUNBLElBQUlBLEVBQUNBLFNBQVNBLEVBQUNBLEtBQUtBLEVBQUNBLE9BQU9BLEVBQUNBLEVBQUVBLEVBQUNBLE9BQU9BLEVBQUNBLEVBQUVBLEVBQUNBLFNBQVNBLEVBQUNBLEdBQUdBLEVBQUNBLEVBQUNBLEVBQUNBLEVBQUNBLFFBQVFBLEVBQUNBLGFBQWFBLEVBQUNBLGlCQUFpQkEsRUFBQ0EsSUFBSUEsRUFBQ0EsUUFBUUEsRUFBQ0EsQ0FBQ0EsRUFBQ0EsZ0JBQWdCQSxFQUFDQSxFQUFFQSxFQUFDQSxZQUFZQSxFQUFDQSxDQUFDQSxFQUFDQSxVQUFVQSxFQUFDQSxDQUFDQSxFQUFDQSxLQUFLQSxFQUFDQSxJQUFJQSxFQUFDQSxXQUFXQSxFQUFDQSxJQUFJQSxFQUFDQSxnQkFBZ0JBLEVBQUNBLEVBQUVBLEVBQUNBLFlBQVlBLEVBQUNBLFVBQVVBLEVBQUNBLFNBQVNBLEVBQUNBLEVBQUNBLEtBQUtBLEVBQUNBLEtBQUtBLEVBQUNBLE1BQU1BLEVBQUNBLGlEQUFpREEsRUFBQ0EsUUFBUUEsRUFBQ0EsSUFBSUEsRUFBQ0EsU0FBU0EsRUFBQ0EsS0FBS0EsRUFBQ0EsT0FBT0EsRUFBQ0EsRUFBRUEsRUFBQ0EsT0FBT0EsRUFBQ0EsRUFBRUEsRUFBQ0EsU0FBU0EsRUFBQ0EsR0FBR0EsRUFBQ0EsRUFBQ0EsRUFBQ0EsRUFBQ0EsUUFBUUEsRUFBQ0EsYUFBYUEsRUFBQ0EsaUJBQWlCQSxFQUFDQSxJQUFJQSxFQUFDQSxRQUFRQSxFQUFDQSxDQUFDQSxFQUFDQSxnQkFBZ0JBLEVBQUNBLEVBQUVBLEVBQUNBLFlBQVlBLEVBQUNBLENBQUNBLEVBQUNBLFVBQVVBLEVBQUNBLENBQUNBLEVBQUNBLEtBQUtBLEVBQUNBLElBQUlBLEVBQUNBLFdBQVdBLEVBQUNBLElBQUlBLEVBQUNBLGdCQUFnQkEsRUFBQ0EsRUFBRUEsRUFBQ0EsWUFBWUEsRUFBQ0EsS0FBS0EsRUFBQ0EsU0FBU0EsRUFBQ0EsRUFBQ0EsS0FBS0EsRUFBQ0EsS0FBS0EsRUFBQ0EsTUFBTUEsRUFBQ0EsaURBQWlEQSxFQUFDQSxRQUFRQSxFQUFDQSxJQUFJQSxFQUFDQSxTQUFTQSxFQUFDQSxLQUFLQSxFQUFDQSxPQUFPQSxFQUFDQSxFQUFFQSxFQUFDQSxPQUFPQSxFQUFDQSxFQUFFQSxFQUFDQSxTQUFTQSxFQUFDQSxHQUFHQSxFQUFDQSxFQUFDQSxFQUFDQSxFQUFDQSxRQUFRQSxFQUFDQSxhQUFhQSxFQUFDQSxpQkFBaUJBLEVBQUNBLElBQUlBLEVBQUNBLFFBQVFBLEVBQUNBLENBQUNBLEVBQUNBLGdCQUFnQkEsRUFBQ0EsRUFBRUEsRUFBQ0EsWUFBWUEsRUFBQ0EsQ0FBQ0EsRUFBQ0EsVUFBVUEsRUFBQ0EsQ0FBQ0EsRUFBQ0EsS0FBS0EsRUFBQ0EsSUFBSUEsRUFBQ0EsV0FBV0EsRUFBQ0EsSUFBSUEsRUFBQ0EsZ0JBQWdCQSxFQUFDQSxFQUFFQSxFQUFDQSxZQUFZQSxFQUFDQSxLQUFLQSxFQUFDQSxTQUFTQSxFQUFDQSxFQUFDQSxLQUFLQSxFQUFDQSxLQUFLQSxFQUFDQSxNQUFNQSxFQUFDQSxpREFBaURBLEVBQUNBLFFBQVFBLEVBQUNBLElBQUlBLEVBQUNBLFNBQVNBLEVBQUNBLEtBQUtBLEVBQUNBLE9BQU9BLEVBQUNBLEVBQUVBLEVBQUNBLE9BQU9BLEVBQUNBLEVBQUVBLEVBQUNBLFNBQVNBLEVBQUNBLEdBQUdBLEVBQUNBLEVBQUNBLENBQUNBLEVBQUNBLEVBQUNBLFVBQVVBLEVBQUNBLEVBQUVBLEVBQUNBLENBQUNBO0lBMEN2OUNBLDJCQUFDQTtBQUFEQSxDQTNDQSxBQTJDQ0EsSUFBQTtBQUVELEFBQThCLGlCQUFyQixvQkFBb0IsQ0FBQzs7QUM5QzlCLElBQU0sa0JBQWtCO0lBQXhCRyxTQUFNQSxrQkFBa0JBO0lBZXhCQyxDQUFDQTtJQWJHRCxpQ0FBSUEsR0FBSkEsVUFBS0EsUUFBaUJBO1FBQ2xCRSxLQUFLQSxDQUFFQSxZQUFZQSxDQUFDQSxDQUFDQTtRQUNyQkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBRUEsWUFBWUEsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7SUFDcENBLENBQUNBO0lBRURGLG1DQUFNQSxHQUFOQTtRQUNJRyxLQUFLQSxDQUFFQSxjQUFjQSxDQUFDQSxDQUFDQTtJQUMzQkEsQ0FBQ0E7SUFFREgsb0NBQU9BLEdBQVBBO1FBQ0lJLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO0lBQ2JBLENBQUNBO0lBRUxKLHlCQUFDQTtBQUFEQSxDQWZBLEFBZUNBLElBQUE7QUFFRCxBQUE0QixpQkFBbkIsa0JBQWtCLENBQUM7O0FDcEI1QixJQUFPLE1BQU0sV0FBWSxrQkFBa0IsQ0FBQyxDQUFDO0FBRzdDLElBQU0sZ0JBQWdCO0lBQXRCSyxTQUFNQSxnQkFBZ0JBO0lBZXRCQyxDQUFDQTtJQWRHRCw4QkFBR0EsR0FBSEEsVUFBSUEsUUFBZUE7UUFDZkUsSUFBSUEsT0FBT0EsR0FBR0E7WUFDVkEsS0FBS0EsRUFBRUEsSUFBSUEsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsaURBQWlEQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxDQUFDQTtZQUNyR0EsS0FBS0EsRUFBRUEsSUFBSUEsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsdURBQXVEQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxDQUFDQTtZQUMzR0EsS0FBS0EsRUFBRUEsSUFBSUEsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsdURBQXVEQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxDQUFDQTtZQUMzR0EsS0FBS0EsRUFBRUEsSUFBSUEsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsaURBQWlEQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxDQUFDQTtZQUNyR0EsS0FBS0EsRUFBRUEsSUFBSUEsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsZ0RBQWdEQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxDQUFDQTtZQUNwR0EsS0FBS0EsRUFBRUEsSUFBSUEsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsc0RBQXNEQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxDQUFDQTtZQUMxR0EsS0FBS0EsRUFBRUEsSUFBSUEsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsc0RBQXNEQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxDQUFDQTtZQUMxR0EsS0FBS0EsRUFBRUEsSUFBSUEsTUFBTUEsQ0FBQ0EsS0FBS0EsRUFBRUEsZ0RBQWdEQSxFQUFFQSxJQUFJQSxFQUFFQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxHQUFHQSxDQUFDQTtTQUN2R0EsQ0FBQ0E7UUFFRkEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7SUFDN0JBLENBQUNBO0lBQ0xGLHVCQUFDQTtBQUFEQSxDQWZBLEFBZUNBLElBQUE7QUFHRCxBQUEwQixpQkFBakIsZ0JBQWdCLENBQUMiLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU3ByaXRlIHtcclxuICAgIHByaXZhdGUgX2lkOnN0cmluZztcclxuICAgIHByaXZhdGUgX3VybDpzdHJpbmc7XHJcbiAgICBwcml2YXRlIF93aWR0aDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9oZWlnaHQ6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfcm93czpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9jb2xzOm51bWJlcjtcclxuICAgIHByaXZhdGUgX2ZyYW1lczpudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6c3RyaW5nLCB1cmw6c3RyaW5nLCB3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIsIHJvd3M6bnVtYmVyLCBjb2xzOm51bWJlciwgZnJhbWVzOm51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5fdXJsID0gdXJsO1xyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX3Jvd3MgPSByb3dzO1xyXG4gICAgICAgIHRoaXMuX2NvbHMgPSBjb2xzO1xyXG4gICAgICAgIHRoaXMuX2ZyYW1lcyA9IGZyYW1lcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaWQoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1cmwoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VybDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2lkdGgoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBoZWlnaHQoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcm93cygpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fcm93cztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29scygpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29scztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZnJhbWVzKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZnJhbWVzO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgPSBTcHJpdGU7IiwiaW1wb3J0IFNwcml0ZSA9IHJlcXVpcmUgKCcuL1Nwcml0ZScpO1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuY2xhc3MgUXVlc3Rpb24ge1xyXG4gICAgcHJpdmF0ZSBfaWQ6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfc3ByaXRlSWQ6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfc3ByaXRlOlNwcml0ZTtcclxuICAgIHByaXZhdGUgX2ludHJvSW1hZ2VVcmw6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfaW50cm9UZXh0O1xyXG4gICAgcHJpdmF0ZSBfc3RhdGU6c3RyaW5nID0gXCJub3Qgc3RhcnRlZFwiOyAvLyBcImNvdW50ZG93blwiLCBcInJ1bm5pbmdcIiwgXCJkb25lXCJcclxuICAgIHByaXZhdGUgX29uU3RhdGVDaGFuZ2VkID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2ZyYW1lOm51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9mcmFtZUR1cmF0aW9uOm51bWJlciA9IDE2OyAvLyAxNm1zID0gNjBmcHNcclxuICAgIHByaXZhdGUgX3N0YXJ0ZWRBdCA9IDA7XHJcbiAgICBwcml2YXRlIF9lbmRlZEF0ID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDpzdHJpbmcsIHNwcml0ZUlkOnN0cmluZywgaW50cm9JbWFnZVVybDpzdHJpbmcsIGludHJvVGV4dCkge1xyXG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5fc3ByaXRlSWQgPSBzcHJpdGVJZDtcclxuICAgICAgICB0aGlzLl9pbnRyb0ltYWdlVXJsID0gaW50cm9JbWFnZVVybDtcclxuICAgICAgICB0aGlzLl9pbnRyb1RleHQgPSBpbnRyb1RleHQ7XHJcbiAgICAgICAgdGhpcy5fc3ByaXRlID0gbmV3IFNwcml0ZShcInNwM1wiLCBcInNwcml0ZXMvMTV4NDAvc3ByaXRlLWFyYWItYW5ncnktc21pbGUtc21hbGwuanBnXCIsIDc2ODAsIDE1MzYwLCA0MCwgMTUsIDYwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZyb21KUyhxdWVzdGlvbil7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBRdWVzdGlvbihcclxuICAgICAgICAgICAgcXVlc3Rpb24uX2lkLFxyXG4gICAgICAgICAgICBxdWVzdGlvbi5fc3ByaXRlSWQsXHJcbiAgICAgICAgICAgIHF1ZXN0aW9uLl9pbnRyb0ltYWdlVXJsLFxyXG4gICAgICAgICAgICBxdWVzdGlvbi5faW50cm9UZXh0XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNwcml0ZUlkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nwcml0ZUlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzcHJpdGUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3ByaXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzcHJpdGUoc3ByaXRlKXtcclxuICAgICAgICAvLyBUT0RPIC0gcmVwb1xyXG4gICAgICAgIHRoaXMuX3Nwcml0ZSA9IHNwcml0ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaW50cm9JbWFnZVVybCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnRyb0ltYWdlVXJsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpbnRyb1RleHQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW50cm9UZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBmcmFtZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mcmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3RhdGUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG9uU3RhdGVDaGFuZ2VkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29uU3RhdGVDaGFuZ2VkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBvblN0YXRlQ2hhbmdlZChvblN0YXRlQ2hhbmdlZCl7XHJcbiAgICAgICAgdGhpcy5fb25TdGF0ZUNoYW5nZWQgPSBvblN0YXRlQ2hhbmdlZDtcclxuICAgIH1cclxuXHJcbiAgICBjb3VudGRvd24oY2FsbGJhY2ssIHNlY29uZHNUb1N0YXJ0PzpudW1iZXIpe1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSAhPT0gXCJub3Qgc3RhcnRlZFwiICYmIHRoaXMuX3N0YXRlICE9PSBcImNvdW50ZG93blwiICl7XHJcbiAgICAgICAgICAgIC8vIHRoZSBvbmx5IHR3byBhbGxvd2VkIHN0YXRlcyB0byBzdGFydCBhIGNvdW50ZG93biBhcmUgXCJub3Qgc3RhcnRlZFwiIGFuZCBcImluIHRoZSBtaWRkbGUgb2YgYSBjb3VudGRvd25cIlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zZXRTdGF0ZShcImNvdW50ZG93blwiKTtcclxuXHJcbiAgICAgICAgaWYgKHNlY29uZHNUb1N0YXJ0ID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmNvdW50ZG93bi5jYWxsKHRoaXMsIGNhbGxiYWNrLCAzKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FsbGJhY2soc2Vjb25kc1RvU3RhcnQpO1xyXG5cclxuICAgICAgICBpZiAoc2Vjb25kc1RvU3RhcnQgPT09IDApe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5jb3VudGRvd24uYmluZCh0aGlzLCBjYWxsYmFjaywgc2Vjb25kc1RvU3RhcnQgLSAxKSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dEZyYW1lKCl7XHJcbiAgICAgICAgKyt0aGlzLl9mcmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydChhbmltYXRpb25DYWxsYmFjayl7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRlZEF0ID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgdGhpcy5fc2V0U3RhdGUoXCJydW5uaW5nXCIpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0ZShhbmltYXRpb25DYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcCgpe1xyXG4gICAgICAgIHRoaXMuX2VuZGVkQXQgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICB0aGlzLl9zZXRTdGF0ZShcImRvbmVcIik7XHJcblxyXG4gICAgICAgIC8vdGhpcy5zYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RWxhcHNlZCgpe1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gXCJydW5uaW5nXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gcGVyZm9ybWFuY2Uubm93KCkgLSB0aGlzLl9zdGFydGVkQXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fc3RhdGUgPT09IFwiZG9uZVwiKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuZGVkQXQgLSB0aGlzLl9zdGFydGVkQXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZShjb3VudGRvd25DYWxsYmFjaywgYW5pbWF0aW9uQ2FsbGJhY2spe1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5fc3RhdGUpe1xyXG4gICAgICAgICAgICBjYXNlIFwibm90IHN0YXJ0ZWRcIjogdGhpcy5jb3VudGRvd24oY291bnRkb3duQ2FsbGJhY2spOyByZXR1cm47XHJcbiAgICAgICAgICAgIGNhc2UgXCJjb3VudGRvd25cIjogdGhpcy5zdGFydChhbmltYXRpb25DYWxsYmFjayk7IHJldHVybjtcclxuICAgICAgICAgICAgY2FzZSBcInJ1bm5pbmdcIjogdGhpcy5zdG9wKCk7IHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZShjYWxsYmFjaywgZnJhbWVOdW1iZXI/Om51bWJlcil7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlICE9PSBcInJ1bm5pbmdcIil7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmcmFtZU51bWJlciA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZnJhbWVOdW1iZXIgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZnJhbWUgPSBmcmFtZU51bWJlcjtcclxuICAgICAgICBjYWxsYmFjayh0aGlzLl9mcmFtZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9mcmFtZSA8IHRoaXMuX3Nwcml0ZS5mcmFtZXMpe1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuYW5pbWF0ZS5iaW5kKHRoaXMsIGNhbGxiYWNrLCBmcmFtZU51bWJlciArIDEpLCB0aGlzLl9mcmFtZUR1cmF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3NldFN0YXRlKHN0YXRlOnN0cmluZyl7XHJcbiAgICAgICAgdmFyIGJlZm9yZSA9IHRoaXMuX3N0YXRlO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgdmFyIGFmdGVyID0gdGhpcy5fc3RhdGU7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fb25TdGF0ZUNoYW5nZWQgPT09IFwiZnVuY3Rpb25cIiAmJiBiZWZvcmUgIT09IGFmdGVyKXtcclxuICAgICAgICAgICAgdGhpcy5fb25TdGF0ZUNoYW5nZWQuY2FsbCh0aGlzLCBhZnRlciwgYmVmb3JlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCA9IFF1ZXN0aW9uOyIsImltcG9ydCBRdWVzdGlvbiA9IHJlcXVpcmUgKCcuL1F1ZXN0aW9uJyk7XHJcblxyXG5jbGFzcyBBbnN3ZXIge1xyXG4gICAgcHJpdmF0ZSBfaWQ6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfdGltZXN0YW1wOiBEYXRlO1xyXG4gICAgcHJpdmF0ZSBfZnJhbWU6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfZHVyYXRpb246bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfdXNlcklkOnN0cmluZztcclxuICAgIHByaXZhdGUgX21hY2hpbmVJZDpzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9xdWVzdGlvbklkOnN0cmluZzsgLy8gYSBxdWVzdGlvbiBjYW4gYmUgcmV1c2VkIGFjcm9zcyBleHBlcmltZW50c1xyXG4gICAgcHJpdmF0ZSBfZXhwZXJpbWVudElkOnN0cmluZzsgLy8gdGhlIHNwZWNpZmljIGluc3RhbmNlIG9mIGFza2luZyB0aGUgcXVlc3Rpb25cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDpzdHJpbmcsIHRpbWVzdGFtcDpEYXRlLCBmcmFtZTpudW1iZXIsIGR1cmF0aW9uOm51bWJlcixcclxuICAgICAgICB1c2VySWQ6c3RyaW5nLCBtYWNoaW5lSWQ6c3RyaW5nLCBxdWVzdGlvbklkOnN0cmluZywgZXhwZXJpbWVudElkOnN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5fdGltZXN0YW1wID0gdGltZXN0YW1wO1xyXG4gICAgICAgIHRoaXMuX2ZyYW1lID0gZnJhbWU7XHJcbiAgICAgICAgdGhpcy5fZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuICAgICAgICB0aGlzLl91c2VySWQgPSB1c2VySWQ7XHJcbiAgICAgICAgdGhpcy5fbWFjaGluZUlkID0gbWFjaGluZUlkO1xyXG4gICAgICAgIHRoaXMuX3F1ZXN0aW9uSWQgPSBxdWVzdGlvbklkO1xyXG4gICAgICAgIHRoaXMuX2V4cGVyaW1lbnRJZCA9IGV4cGVyaW1lbnRJZDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZnJvbVF1ZXN0aW9uIChxdWVzdGlvbjpRdWVzdGlvbiwgZXhwZXJpbWVudElkLCB1c2VySWQpe1xyXG4gICAgICAgIHZhciBjcmVhdGVJZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiAoKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKSB8IDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IEFuc3dlciAoXHJcbiAgICAgICAgICAgIGNyZWF0ZUlkKCksXHJcbiAgICAgICAgICAgIG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIHF1ZXN0aW9uLmZyYW1lLFxyXG4gICAgICAgICAgICBxdWVzdGlvbi5nZXRFbGFwc2VkKCksXHJcbiAgICAgICAgICAgIHVzZXJJZCxcclxuICAgICAgICAgICAgXCJtYWNoaW5lLWlkXCIsXHJcbiAgICAgICAgICAgIHF1ZXN0aW9uLmlkLFxyXG4gICAgICAgICAgICBleHBlcmltZW50SWRcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpZCgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRpbWVzdGFtcCgpOkRhdGV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVzdGFtcDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZnJhbWUoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZyYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkdXJhdGlvbigpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fZHVyYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVzZXJJZCgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXNlcklkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYWNoaW5lSWQoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hY2hpbmVJZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcXVlc3Rpb25JZCgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb25JZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZXhwZXJpbWVudElkKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9leHBlcmltZW50SWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCA9IEFuc3dlcjsiLCJjbGFzcyBCcm93c2VyIHtcclxuICAgIHByaXZhdGUgX2lkOnN0cmluZztcclxuICAgIHByaXZhdGUgX3R5cGU6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfdmVyc2lvbjpzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9pc01vYmlsZTpib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfZXh0ZXJuYWxJUDpzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9pbnRlcm5hbElQOnN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDpzdHJpbmcsIHR5cGU6c3RyaW5nLCB2ZXJzaW9uOnN0cmluZywgaXNNb2JpbGU6Ym9vbGVhbiwgZXh0ZXJuYWxJUDpzdHJpbmcsIGludGVybmFsSVA6c3RyaW5nKSB7XHJcbiAgICAgICAgIHRoaXMuX2lkID0gaWQ7XHJcbiAgICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xyXG4gICAgICAgICB0aGlzLl92ZXJzaW9uID0gdmVyc2lvbjtcclxuICAgICAgICAgdGhpcy5faXNNb2JpbGUgPSBpc01vYmlsZTtcclxuICAgICAgICAgdGhpcy5fZXh0ZXJuYWxJUCA9IGV4dGVybmFsSVA7XHJcbiAgICAgICAgIHRoaXMuX2ludGVybmFsSVAgPSBpbnRlcm5hbElQO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdHlwZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2ZXJzaW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnNpb247XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzTW9iaWxlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzTW9iaWxlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBleHRlcm5hbElQKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4dGVybmFsSVA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGludGVybmFsSVAoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW50ZXJuYWxJUDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0ID0gQnJvd3NlcjsiLCJpbXBvcnQgUXVlc3Rpb24gPSByZXF1aXJlICgnLi9RdWVzdGlvbicpO1xyXG5cclxuY2xhc3MgRXhwZXJpbWVudFRlbXBsYXRlIHtcclxuICAgIHByaXZhdGUgX2lkOnN0cmluZztcclxuICAgIHByaXZhdGUgX25hbWU6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfcXVlc3Rpb25zOkFycmF5PFF1ZXN0aW9uPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHF1ZXN0aW9uczogQXJyYXk8UXVlc3Rpb24+KSB7XHJcbiAgICAgICAgdGhpcy5faWQgPSBpZDtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9xdWVzdGlvbnMgPSBxdWVzdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZyb21KUyh0ZW1wbGF0ZSl7XHJcbiAgICAgICAgdmFyIHF1ZXN0aW9ucyA9IHRlbXBsYXRlLl9xdWVzdGlvbnMubWFwKGZ1bmN0aW9uKHF1ZXN0aW9uKXtcclxuICAgICAgICAgICAgcmV0dXJuIFF1ZXN0aW9uLmZyb21KUyhxdWVzdGlvbik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgRXhwZXJpbWVudFRlbXBsYXRlKFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZS5faWQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlLl9uYW1lLFxyXG4gICAgICAgICAgICBxdWVzdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbmFtZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBxdWVzdGlvbnMoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb25zO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgPSBFeHBlcmltZW50VGVtcGxhdGU7IiwiaW1wb3J0IEV4cGVyaW1lbnRUZW1wbGF0ZSA9IHJlcXVpcmUgKCcuL0V4cGVyaW1lbnRUZW1wbGF0ZScpO1xyXG5pbXBvcnQgQW5zd2VyID0gcmVxdWlyZSAoJy4vQW5zd2VyJyk7XHJcblxyXG5jbGFzcyBFeHBlcmltZW50IHtcclxuICAgIHByaXZhdGUgX2lkOnN0cmluZztcclxuICAgIHByaXZhdGUgX2ZhY2lsaXRhdG9yczpBcnJheTxzdHJpbmc+O1xyXG4gICAgcHJpdmF0ZSBfdGFnczpBcnJheTxzdHJpbmc+O1xyXG4gICAgcHJpdmF0ZSBfc3RhcnRUaW1lOkRhdGU7XHJcbiAgICBwcml2YXRlIF90ZW1wbGF0ZTpFeHBlcmltZW50VGVtcGxhdGU7XHJcbiAgICBwcml2YXRlIF9hbnN3ZXJzOkFycmF5PEFuc3dlcj47XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6c3RyaW5nLCBmYWNpbGl0YXRvcnM6QXJyYXk8c3RyaW5nPiwgdGFnczpBcnJheTxzdHJpbmc+LCBzdGFydFRpbWU6RGF0ZSwgdGVtcGxhdGU6RXhwZXJpbWVudFRlbXBsYXRlKSB7XHJcbiAgICAgICAgdGhpcy5faWQgPSBpZDtcclxuICAgICAgICB0aGlzLl9mYWNpbGl0YXRvcnMgPSBmYWNpbGl0YXRvcnM7XHJcbiAgICAgICAgdGhpcy5fdGFncyA9IHRhZ3M7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gc3RhcnRUaW1lO1xyXG4gICAgICAgIHRoaXMuX3RlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICAgICAgdGhpcy5fYW5zd2VycyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBmcm9tSlMoZXhwKXtcclxuICAgICAgICByZXR1cm4gbmV3IEV4cGVyaW1lbnQoXHJcbiAgICAgICAgICAgIGV4cC5faWQsXHJcbiAgICAgICAgICAgIGV4cC5fZmFjaWxpdGF0b3JzLFxyXG4gICAgICAgICAgICBleHAuX3RhZ3MsXHJcbiAgICAgICAgICAgIGV4cC5fc3RhcnRUaW1lLFxyXG4gICAgICAgICAgICBFeHBlcmltZW50VGVtcGxhdGUuZnJvbUpTKGV4cC5fdGVtcGxhdGUpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZhY2lsaXRhdG9ycygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mYWNpbGl0YXRvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRhZ3MoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGFncztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3RhcnRUaW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0VGltZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGVtcGxhdGUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGVtcGxhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFuc3dlcnMoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYW5zd2VycztcclxuICAgIH1cclxuXHJcbiAgICBhZGRBbnN3ZXIoYW5zd2VyOkFuc3dlcil7XHJcbiAgICAgICAgdGhpcy5fYW5zd2Vycy5wdXNoKGFuc3dlcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCA9IEV4cGVyaW1lbnQ7IiwiY2xhc3MgSWRHZW5lcmF0b3Ige1xyXG4gICAgc3RhdGljIG5ld0lkKCl7XHJcbiAgICAgICAgcmV0dXJuICgoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApIHwgMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgPSBJZEdlbmVyYXRvciIsImltcG9ydCBRdWVzdGlvbiA9IHJlcXVpcmUgKCcuL1F1ZXN0aW9uJyk7XHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5jbGFzcyBRdWVzdGlvbkxpc3Qge1xyXG4gICAgcHJpdmF0ZSBfcXVlc3Rpb25zOkFycmF5PFF1ZXN0aW9uPjtcclxuICAgIHByaXZhdGUgX2N1cnJlbnRJbmRleCA9IC0xO1xyXG4gICAgcHJpdmF0ZSBfb25Eb25lID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihxdWVzdGlvbnM/OkFycmF5PFF1ZXN0aW9uPiwgb25Eb25lPzphbnkpIHtcclxuICAgICAgICB0aGlzLl9xdWVzdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLl9vbkRvbmUgPSBvbkRvbmU7XHJcblxyXG4gICAgICAgIGlmICghcXVlc3Rpb25zKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcXVlc3Rpb25zLmZvckVhY2goZnVuY3Rpb24ocXVlc3Rpb24pe1xyXG4gICAgICAgICAgICB0aGlzLmFkZChxdWVzdGlvbik7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKHF1ZXN0aW9uOiBRdWVzdGlvbil7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHF1ZXN0aW9uLm9uU3RhdGVDaGFuZ2VkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxmLl9vbkRvbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBzZWxmLmFyZUFsbFN0YXRlcyhcImRvbmVcIikpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fb25Eb25lLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLl9xdWVzdGlvbnMucHVzaChxdWVzdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VycmVudCgpe1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50SW5kZXggPT09IC0xICYmIHRoaXMuX3F1ZXN0aW9ucy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50SW5kZXggPT09IC0xKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb25zW3RoaXMuX2N1cnJlbnRJbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dCgpe1xyXG4gICAgICAgIGlmICh0aGlzLmNhbk1vdmVOZXh0KCkpe1xyXG4gICAgICAgICAgICArK3RoaXMuX2N1cnJlbnRJbmRleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJldigpe1xyXG4gICAgICAgIGlmICh0aGlzLmNhbk1vdmVQcmV2KCkpe1xyXG4gICAgICAgICAgICAtLXRoaXMuX2N1cnJlbnRJbmRleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2FuTW92ZU5leHQoKXtcclxuICAgICAgICByZXR1cm4gIHRoaXMuX3F1ZXN0aW9ucy5sZW5ndGggPiAwICYmIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudEluZGV4IDwgdGhpcy5fcXVlc3Rpb25zLmxlbmd0aCAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuTW92ZVByZXYoKXtcclxuICAgICAgICByZXR1cm4gIHRoaXMuX3F1ZXN0aW9ucy5sZW5ndGggPiAwICYmIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID4gMFxyXG4gICAgfVxyXG5cclxuICAgIGxlbmd0aCAoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb25zLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBhcmVBbGxTdGF0ZXMoc3RhdGU6IHN0cmluZyl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXN0aW9ucy5ldmVyeSAoZnVuY3Rpb24gKHF1ZXN0aW9uKXtcclxuICAgICAgICAgICAgcmV0dXJuIHF1ZXN0aW9uLnN0YXRlID09PSBzdGF0ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0ID0gUXVlc3Rpb25MaXN0OyIsImNsYXNzIFVzZXIge1xyXG4gICAgcHJpdmF0ZSBfaWQ6c3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOnN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgPSBVc2VyO1xyXG4iLCJpbXBvcnQgRXhwZXJpbWVudCA9IHJlcXVpcmUgKCcuLi9tb2RlbHMvRXhwZXJpbWVudCcpO1xyXG5pbXBvcnQgU3ByaXRlID0gcmVxdWlyZSAoJy4uL21vZGVscy9TcHJpdGUnKTtcclxuZGVjbGFyZSB2YXIgJDtcclxuXHJcbmNsYXNzIEV4cGVyaW1lbnRSZXBvc2l0b3J5IHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9mYWtlRXhwZXJpbWVudCA9IHtcIl9pZFwiOlwiZTFcIixcIl9mYWNpbGl0YXRvcnNcIjpbXCJnaWxcIl0sXCJfdGFnc1wiOltcInRlc3RcIl0sXCJfc3RhcnRUaW1lXCI6XCIyMDE1LTA0LTEzVDAwOjI1OjUyLjkzN1pcIixcIl90ZW1wbGF0ZVwiOntcIl9pZFwiOlwiZXQxXCIsXCJfbmFtZVwiOlwidGVzdFwiLFwiX3F1ZXN0aW9uc1wiOlt7XCJfc3RhdGVcIjpcIm5vdCBzdGFydGVkXCIsXCJfb25TdGF0ZUNoYW5nZWRcIjpudWxsLFwiX2ZyYW1lXCI6MCxcIl9mcmFtZUR1cmF0aW9uXCI6MTYsXCJfc3RhcnRlZEF0XCI6MCxcIl9lbmRlZEF0XCI6MCxcIl9pZFwiOlwicTFcIixcIl9zcHJpdGVJZFwiOlwiczJcIixcIl9pbnRyb0ltYWdlVXJsXCI6XCJcIixcIl9pbnRyb1RleHRcIjpcIk11aGFtbWFkXCIsXCJfc3ByaXRlXCI6e1wiX2lkXCI6XCJzcDNcIixcIl91cmxcIjpcInNwcml0ZXMvMTV4NDAvc3ByaXRlLWFyYWItYW5ncnktc21pbGUtc21hbGwuanBnXCIsXCJfd2lkdGhcIjo3NjgwLFwiX2hlaWdodFwiOjE1MzYwLFwiX3Jvd3NcIjo0MCxcIl9jb2xzXCI6MTUsXCJfZnJhbWVzXCI6NjAwfX0se1wiX3N0YXRlXCI6XCJub3Qgc3RhcnRlZFwiLFwiX29uU3RhdGVDaGFuZ2VkXCI6bnVsbCxcIl9mcmFtZVwiOjAsXCJfZnJhbWVEdXJhdGlvblwiOjE2LFwiX3N0YXJ0ZWRBdFwiOjAsXCJfZW5kZWRBdFwiOjAsXCJfaWRcIjpcInEyXCIsXCJfc3ByaXRlSWRcIjpcInM0XCIsXCJfaW50cm9JbWFnZVVybFwiOlwiXCIsXCJfaW50cm9UZXh0XCI6XCJNdWhhbW1hZFwiLFwiX3Nwcml0ZVwiOntcIl9pZFwiOlwic3AzXCIsXCJfdXJsXCI6XCJzcHJpdGVzLzE1eDQwL3Nwcml0ZS1hcmFiLWFuZ3J5LXNtaWxlLXNtYWxsLmpwZ1wiLFwiX3dpZHRoXCI6NzY4MCxcIl9oZWlnaHRcIjoxNTM2MCxcIl9yb3dzXCI6NDAsXCJfY29sc1wiOjE1LFwiX2ZyYW1lc1wiOjYwMH19LHtcIl9zdGF0ZVwiOlwibm90IHN0YXJ0ZWRcIixcIl9vblN0YXRlQ2hhbmdlZFwiOm51bGwsXCJfZnJhbWVcIjowLFwiX2ZyYW1lRHVyYXRpb25cIjoxNixcIl9zdGFydGVkQXRcIjowLFwiX2VuZGVkQXRcIjowLFwiX2lkXCI6XCJxM1wiLFwiX3Nwcml0ZUlkXCI6XCJzN1wiLFwiX2ludHJvSW1hZ2VVcmxcIjpcIlwiLFwiX2ludHJvVGV4dFwiOlwiQXZpXCIsXCJfc3ByaXRlXCI6e1wiX2lkXCI6XCJzcDNcIixcIl91cmxcIjpcInNwcml0ZXMvMTV4NDAvc3ByaXRlLWFyYWItYW5ncnktc21pbGUtc21hbGwuanBnXCIsXCJfd2lkdGhcIjo3NjgwLFwiX2hlaWdodFwiOjE1MzYwLFwiX3Jvd3NcIjo0MCxcIl9jb2xzXCI6MTUsXCJfZnJhbWVzXCI6NjAwfX0se1wiX3N0YXRlXCI6XCJub3Qgc3RhcnRlZFwiLFwiX29uU3RhdGVDaGFuZ2VkXCI6bnVsbCxcIl9mcmFtZVwiOjAsXCJfZnJhbWVEdXJhdGlvblwiOjE2LFwiX3N0YXJ0ZWRBdFwiOjAsXCJfZW5kZWRBdFwiOjAsXCJfaWRcIjpcInE0XCIsXCJfc3ByaXRlSWRcIjpcInM4XCIsXCJfaW50cm9JbWFnZVVybFwiOlwiXCIsXCJfaW50cm9UZXh0XCI6XCJBdmlcIixcIl9zcHJpdGVcIjp7XCJfaWRcIjpcInNwM1wiLFwiX3VybFwiOlwic3ByaXRlcy8xNXg0MC9zcHJpdGUtYXJhYi1hbmdyeS1zbWlsZS1zbWFsbC5qcGdcIixcIl93aWR0aFwiOjc2ODAsXCJfaGVpZ2h0XCI6MTUzNjAsXCJfcm93c1wiOjQwLFwiX2NvbHNcIjoxNSxcIl9mcmFtZXNcIjo2MDB9fV19LFwiX2Fuc3dlcnNcIjpbXX07XHJcbiAgICBwcml2YXRlIF9zcHJpdGVzID0ge307XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fc3ByaXRlcyA9IHtcclxuICAgICAgICAgICAgXCJzMVwiOiBuZXcgU3ByaXRlKFwiczFcIiwgXCJzcHJpdGVzLzE1eDQwL3Nwcml0ZS1hcmFiLWFuZ3J5LXNtaWxlLXNtYWxsLmpwZ1wiLCA3NjgwLCAxNTM2MCwgNDAsIDE1LCA2MDApLFxyXG4gICAgICAgICAgICBcInMyXCI6IG5ldyBTcHJpdGUoXCJzMlwiLCBcInNwcml0ZXMvMTV4NDAvc3ByaXRlLWFyYWItYW5ncnktc21pbGUtdGVldGgtc21hbGwuanBnXCIsIDc2ODAsIDE1MzYwLCA0MCwgMTUsIDYwMCksXHJcbiAgICAgICAgICAgIFwiczNcIjogbmV3IFNwcml0ZShcInMzXCIsIFwic3ByaXRlcy8xNXg0MC9zcHJpdGUtYXJhYi1zbWlsZS1hbmdyeS10ZWV0aC1zbWFsbC5qcGdcIiwgNzY4MCwgMTUzNjAsIDQwLCAxNSwgNjAwKSxcclxuICAgICAgICAgICAgXCJzNFwiOiBuZXcgU3ByaXRlKFwiczRcIiwgXCJzcHJpdGVzLzE1eDQwL3Nwcml0ZS1hcmFiLXNtaWxlLWFuZ3J5LXNtYWxsLmpwZ1wiLCA3NjgwLCAxNTM2MCwgNDAsIDE1LCA2MDApLFxyXG4gICAgICAgICAgICBcInM1XCI6IG5ldyBTcHJpdGUoXCJzNVwiLCBcInNwcml0ZXMvMTV4NDAvc3ByaXRlLWpldy1hbmdyeS1zbWlsZS1zbWFsbC5qcGdcIiwgNzY4MCwgMTUzNjAsIDQwLCAxNSwgNjAwKSxcclxuICAgICAgICAgICAgXCJzNlwiOiBuZXcgU3ByaXRlKFwiczZcIiwgXCJzcHJpdGVzLzE1eDQwL3Nwcml0ZS1qZXctYW5ncnktc21pbGUtdGVldGgtc21hbGwuanBnXCIsIDc2ODAsIDE1MzYwLCA0MCwgMTUsIDYwMCksXHJcbiAgICAgICAgICAgIFwiczdcIjogbmV3IFNwcml0ZShcInM3XCIsIFwic3ByaXRlcy8xNXg0MC9zcHJpdGUtamV3LXNtaWxlLWFuZ3J5LXRlZXRoLXNtYWxsLmpwZ1wiLCA3NjgwLCAxNTM2MCwgNDAsIDE1LCA2MDApLFxyXG4gICAgICAgICAgICBcInM4XCI6IG5ldyBTcHJpdGUoXCJzOFwiLCBcInNwcml0ZXMvMTV4NDAvc3ByaXRlLWpldy1zbWlsZS1hbmdyeS1zbWFsbC5qcGdcIiwgNzY4MCwgMTUzNjAsIDQwLCAxNSwgNjAwKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZmV0Y2goKSB7XHJcbiAgICAgICAgLy8gZmFrZVxcXHJcbiAgICAgICAgdmFyIHNwcml0ZXMgPSB0aGlzLl9zcHJpdGVzO1xyXG4gICAgICAgIHJldHVybiAkLndoZW4odHJ1ZSkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgZXhwZXJpbWVudCA9IEV4cGVyaW1lbnQuZnJvbUpTKEV4cGVyaW1lbnRSZXBvc2l0b3J5Ll9mYWtlRXhwZXJpbWVudCk7XHJcbiAgICAgICAgICAgICAvLyBUT0RPOiByZXBvc2l0b3J5eVxyXG4gICAgICAgICAgICBleHBlcmltZW50LnRlbXBsYXRlLnF1ZXN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHF1ZXN0aW9uKXtcclxuICAgICAgICAgICAgICAgIHF1ZXN0aW9uLnNwcml0ZSA9IHNwcml0ZXNbcXVlc3Rpb24uc3ByaXRlSWRdOyBcclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZXhwZXJpbWVudDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gcmVhbFxyXG4gICAgICAgIHJldHVybiAkLmdldEpTT04oIFwiZXhwZXJpbWVudHMvXCIpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGV4cGVyaW1lbnRzKXtcclxuICAgICAgICAgICAgICAgIHZhciBmaXJzdCA9IGV4cGVyaW1lbnRzWzBdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEV4cGVyaW1lbnQuZnJvbUpTKGZpcnN0KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIC8vIHRlbXBcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRXhwZXJpbWVudC5mcm9tSlMoRXhwZXJpbWVudFJlcG9zaXRvcnkuX2Zha2VFeHBlcmltZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCA9IEV4cGVyaW1lbnRSZXBvc2l0b3J5OyIsImltcG9ydCBRdWVzdGlvbiA9IHJlcXVpcmUgKCcuLi9tb2RlbHMvUXVlc3Rpb24nKTtcclxuZGVjbGFyZSB2YXIgJDtcclxuXHJcbmNsYXNzIFF1ZXN0aW9uUmVwb3NpdG9yeSB7XHJcbiAgICBcclxuICAgIHNhdmUocXVlc3Rpb246UXVlc3Rpb24pIHtcclxuICAgICAgICBhbGVydCAoJzExMTExMTExMTEnKTtcclxuICAgICAgICAkLnBvc3QoIFwicXVlc3Rpb25zL1wiLCBxdWVzdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgbm90aWZ5KCl7XHJcbiAgICAgICAgYWxlcnQgKFwibm8gdGVlZWVlIGZ5XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybjEoKXtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCA9IFF1ZXN0aW9uUmVwb3NpdG9yeTsiLCJpbXBvcnQgU3ByaXRlID0gcmVxdWlyZSAoXCIuLi9tb2RlbHMvU3ByaXRlXCIpO1xyXG5kZWNsYXJlIHZhciAkO1xyXG5cclxuY2xhc3MgU3ByaXRlUmVwb3NpdG9yeXtcclxuICAgIGdldChzcHJpdGVJZDpzdHJpbmcpe1xyXG4gICAgICAgIHZhciBzcHJpdGVzID0ge1xyXG4gICAgICAgICAgICBcInNwMVwiOiBuZXcgU3ByaXRlKFwic3AxXCIsIFwic3ByaXRlcy8xNXg0MC9zcHJpdGUtYXJhYi1hbmdyeS1zbWlsZS1zbWFsbC5qcGdcIiwgNzY4MCwgMTUzNjAsIDQwLCAxNSwgNjAwKSxcclxuICAgICAgICAgICAgXCJzcDJcIjogbmV3IFNwcml0ZShcInNwMlwiLCBcInNwcml0ZXMvMTV4NDAvc3ByaXRlLWFyYWItYW5ncnktc21pbGUtdGVldGgtc21hbGwuanBnXCIsIDc2ODAsIDE1MzYwLCA0MCwgMTUsIDYwMCksXHJcbiAgICAgICAgICAgIFwic3AzXCI6IG5ldyBTcHJpdGUoXCJzcDNcIiwgXCJzcHJpdGVzLzE1eDQwL3Nwcml0ZS1hcmFiLXNtaWxlLWFuZ3J5LXRlZXRoLXNtYWxsLmpwZ1wiLCA3NjgwLCAxNTM2MCwgNDAsIDE1LCA2MDApLFxyXG4gICAgICAgICAgICBcInNwNFwiOiBuZXcgU3ByaXRlKFwic3A0XCIsIFwic3ByaXRlcy8xNXg0MC9zcHJpdGUtYXJhYi1zbWlsZS1hbmdyeS1zbWFsbC5qcGdcIiwgNzY4MCwgMTUzNjAsIDQwLCAxNSwgNjAwKSxcclxuICAgICAgICAgICAgXCJzcDVcIjogbmV3IFNwcml0ZShcInNwNVwiLCBcInNwcml0ZXMvMTV4NDAvc3ByaXRlLWpldy1hbmdyeS1zbWlsZS1zbWFsbC5qcGdcIiwgNzY4MCwgMTUzNjAsIDQwLCAxNSwgNjAwKSxcclxuICAgICAgICAgICAgXCJzcDZcIjogbmV3IFNwcml0ZShcInNwNlwiLCBcInNwcml0ZXMvMTV4NDAvc3ByaXRlLWpldy1hbmdyeS1zbWlsZS10ZWV0aC1zbWFsbC5qcGdcIiwgNzY4MCwgMTUzNjAsIDQwLCAxNSwgNjAwKSxcclxuICAgICAgICAgICAgXCJzcDdcIjogbmV3IFNwcml0ZShcInNwN1wiLCBcInNwcml0ZXMvMTV4NDAvc3ByaXRlLWpldy1zbWlsZS1hbmdyeS10ZWV0aC1zbWFsbC5qcGdcIiwgNzY4MCwgMTUzNjAsIDQwLCAxNSwgNjAwKSxcclxuICAgICAgICAgICAgXCJzcDhcIjogbmV3IFNwcml0ZShcInNwOFwiLCBcInNwcml0ZXMvMTV4NDAvc3ByaXRlLWpldy1zbWlsZS1hbmdyeS1zbWFsbC5qcGdcIiwgNzY4MCwgMTUzNjAsIDQwLCAxNSwgNjAwKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzcHJpdGVzW3Nwcml0ZUlkXTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCA9IFNwcml0ZVJlcG9zaXRvcnk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9