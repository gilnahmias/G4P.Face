///<reference path='../typings/node/node.d.ts'/>

class Answer {
    private _id:string;
    private _timestamp: Date;
    private _frame:number;
    private _duration:number;
    private _userId:string;
    private _machineId:string;
    private _questionId:string; // a question can be reused across experiments
    private _experimentId:string; // the specific instance of asking the question

    constructor(id:string, _timestamp:Date, frame:number, duration:number,
        userId:string, machineId:string, questionId:string, experimentId:string) {
        this._id = id;
        this._timestamp = _timestamp;
        this._frame = frame;
        this._duration = duration;
        this._userId = userId;
        this._machineId = machineId;
        this._questionId = questionId;
        this._experimentId = experimentId;
    }

    get id():string{
        return this._id;
    }

    get _timestamp():string{
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