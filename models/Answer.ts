import Question = require ('./Question');

class Answer {
    private _id:string;
    private _timestamp: Date;
    private _frame:number;
    private _duration:number;
    private _userId:string;
    private _machineId:string;
    private _questionId:string; // a question can be reused across experiments
    private _experimentId:string; // the specific instance of asking the question

    constructor(id:string, timestamp:Date, frame:number, duration:number,
        userId:string, machineId:string, questionId:string, experimentId:string) {
        this._id = id;
        this._timestamp = timestamp;
        this._frame = frame;
        this._duration = duration;
        this._userId = userId;
        this._machineId = machineId;
        this._questionId = questionId;
        this._experimentId = experimentId;
    }

    static fromQuestion (question:Question, experimentId, userId){
        var createId = function(){
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        };

        return new Answer (
            createId(),
            new Date(),
            question.frame,
            question.getElapsed(),
            userId,
            "machine-id",
            question.id,
            experimentId
        );
    }

    get id():string{
        return this._id;
    }

    get timestamp():Date{
        return this._timestamp;
    }

    get frame():number{
        return this._frame;
    }

    get duration():number{
        return this._duration;
    }

    get userId():string{
        return this._userId;
    }

    get machineId():string{
        return this._machineId;
    }

    get questionId():string{
        return this._questionId;
    }

    get experimentId():string{
        return this._experimentId;
    }
}

export = Answer;