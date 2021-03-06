import Question = require ('./Question');

class ExperimentTemplate {
    private _id:string;
    private _name:string;
    private _questions:Array<Question>;

    constructor(id: string, name: string, questions: Array<Question>) {
        this._id = id;
        this._name = name;
        this._questions = questions;
    }

    static fromJS(template){
        var questions = template._questions.map(function(question){
            return Question.fromJS(question);
        });

        return new ExperimentTemplate(
            template._id,
            template._name,
            questions
        );
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get questions(){
        return this._questions;
    }
}

export = ExperimentTemplate;