///<reference path='../typings/node/node.d.ts'/>

class User {
    private _id:string;

    constructor(id:string) {
        this._id = id;
    }

    get id(){
        return this._id;
    }
}