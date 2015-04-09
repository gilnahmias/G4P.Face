import Question = require ('./Question');

'use strict';

class QuestionList {
    private _questions:Array<Question>;
    private _currentIndex = -1;

    constructor(questions?:Array<Question>) {
        this._questions = [];

        if (!questions){
            return;
        }

        questions.forEach(function(question){
            this.add(question);
        }, this);
    }

    add(question: Question){
        var self = this;
        question.onStateChanged = function(){
            if (self.areAllStates("done") && typeof this._onDone === "function"){
                debugger;
                this._onDone.call(this);
            }
        };

        this._questions.push(question);
    }

    getCurrent(){
        if (this._currentIndex === -1 && this._questions.length > 0){
            this._currentIndex = 0;
        }

        if (this._currentIndex === -1){
            return null;
        }

        return this._questions[this._currentIndex];
    }

    next(){
        if (this.canMoveNext()){
            ++this._currentIndex;
        }
    }

    prev(){
        if (this.canMovePrev()){
            --this._currentIndex;
        }
    }

    canMoveNext(){
        return  this._questions.length > 0 && 
                this._currentIndex < this._questions.length - 1;
    }

    canMovePrev(){
        return  this._questions.length > 0 && 
                this._currentIndex > 0
    }

    length (){
        return this._questions.length;
    }

    areAllStates(state: string){
        return this._questions.every (function (question){
            return question.state === state;
        });
    }
}

export = QuestionList;