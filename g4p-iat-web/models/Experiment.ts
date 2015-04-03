﻿import ExperimentTemplate = require ('ExperimentTemplate');

class Experiment {
    private _id:string;
    private _facilitators:Array<string>;
    private _tags:Array<string>;
    private _startTime:Date;
    private _template:ExperimentTemplate;

    constructor(id:string, facilitators:Array<string>, tags:Array<string>, startTime:Date, template:ExperimentTemplate) {
        this._id = id;
        this._facilitators = facilitators;
        this._tags = tags;
        this._startTime = startTime;
        this._template = template;
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
}

export = Experiment;