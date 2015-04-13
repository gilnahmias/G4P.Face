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
