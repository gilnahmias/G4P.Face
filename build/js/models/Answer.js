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
