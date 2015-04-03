class Browser {
    private _id:string;
    private _type:string;
    private _version:string;
    private _isMobile:boolean;
    private _externalIP:string;
    private _internalIP:string;

    constructor(id:string, type:string, version:string, isMobile:boolean, externalIP:string, internalIP:string) {
         this._id = id;
         this._type = type;
         this._version = version;
         this._isMobile = isMobile;
         this._externalIP = externalIP;
         this._internalIP = internalIP;
    }

    get id(){
        return this._id;
    }

    get type(){
        return this._type;
    }

    get version(){
        return this._version;
    }

    get isMobile(){
        return this._isMobile;
    }

    get externalIP(){
        return this._externalIP;
    }

    get internalIP(){
        return this._internalIP;
    }

}