///<reference path='../typings/node/node.d.ts'/>

class Question {
    private _id:string;
    private _spriteId:string;
    private _introImageUrl:string;
    private _introTexts;

    constructor(id:string, spriteId:string, introImageUrl:string, _introTexts) {
        this._id = id;
        this._spriteId = spriteId;
        this._introImageUrl = _introImageUrl;
        this._introTexts = _introTexts;
    }

    get id(){
        return this._id;
    }

    get spriteId(){
        return this._spriteId;
    }

    get introImageUrl(){
        return this._introImageUrl;
    }

    get introTexts(){
        return this._introTexts;
    }
}