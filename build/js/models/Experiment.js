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
