///<reference path="./Question.ts" />

class ExperimentTemplate {
    private _id:string;
    private _name:string;
    private _questions:Array<Question>;

    constructor(id: string, name: string, questions: Array<Question>) {
        this._id = id;
        this._name = name;
        this._questions = questions;
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