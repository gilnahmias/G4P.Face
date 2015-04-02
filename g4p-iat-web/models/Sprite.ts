///<reference path='../typings/node/node.d.ts'/>

class Sprite {
    private _id:string;
    private _url:string;
    private _width:number;
    private _height:number;
    private _rows:number;
    private _cols:number;

    constructor(id:string, url:string, width:number, height:number, rows:number, cols:number) {
        this._id = id;
        this._url = url;
        this._width = width;
        this._height = height;
        this._rows = rows;
        this._cols = cols;
    }

    get id():string{
        return this._id;
    }

    get url():string{
        return this._url;
    }

    get width():number{
        return this._width;
    }

    get height():number{
        return this._height;
    }

    get rows():number{
        return this._rows;
    }

    get cols():number{
        return this._cols;
    }
}