class Question {
    private _id:string;
    private _spriteId:string;
    private _introImageUrl:string;
    private _introTexts;

    constructor(id:string, spriteId:string, introImageUrl:string, introTexts) {
        this._id = id;
        this._spriteId = spriteId;
        this._introImageUrl = introImageUrl;
        this._introTexts = introTexts;
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

export = Question;