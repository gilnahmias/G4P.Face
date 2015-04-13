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
