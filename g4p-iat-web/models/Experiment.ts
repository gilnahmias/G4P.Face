import ExperimentTemplate = require ('./ExperimentTemplate');
import Answer = require ('./Answer');

class Experiment {
    private _id:string;
    private _facilitators:Array<string>;
    private _tags:Array<string>;
    private _startTime:Date;
    private _template:ExperimentTemplate;
    private _answers:Array<Answer>;

    constructor(id:string, facilitators:Array<string>, tags:Array<string>, startTime:Date, template:ExperimentTemplate) {
        this._id = id;
        this._facilitators = facilitators;
        this._tags = tags;
        this._startTime = startTime;
        this._template = template;
        this._answers = [];
    }

    static fromJS(exp){
        return new Experiment(
            exp._id,
            exp._facilitators,
            exp._tags,
            exp._startTime,
            ExperimentTemplate.fromJS(exp._template)
        );
    }

    get id(){
        return this._id;
    }

    get facilitators(){
        return this._facilitators;
    }

    get tags(){
        return this._tags;
    }

    get startTime(){
        return this._startTime;
    }

    get template(){
        return this._template;
    }

    get answers(){
        return this._answers;
    }

    addAnswer(answer:Answer){
        this._answers.push(answer);
    }
}

export = Experiment;