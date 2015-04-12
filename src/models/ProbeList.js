'use strict';

var DataService = require ('./DataService.js');

var ProbeList = function(){
    this._list = [];
    this._currentProbeIndex = -1;
};

ProbeList.prototype.add = function (probe){
    var self = this;
    probe._onStateChanged = function(){
        if (self.isEveryState("done")){
            if (typeof self._onDone === "function"){
                self._onDone.call(this);
            }
        }
    };

    this._list.push (probe);
};

ProbeList.prototype.getCurrentProbe = function(){
    if (this._currentProbeIndex === -1 && this._list.length > 0){
        this._currentProbeIndex = 0;
    }

    if (this._currentProbeIndex === -1){
        return null;
    }

    return this._list[this._currentProbeIndex];
};

ProbeList.prototype.next = function(){
    if (this.canMoveNext()){
        ++this._currentProbeIndex;
    }
};

ProbeList.prototype.prev = function(){
    if (this.canMovePrev()){
        --this._currentProbeIndex;
    }
};

ProbeList.prototype.canMoveNext = function(){
    return this._list.length > 0 && this._currentProbeIndex < this._list.length - 1;
};

ProbeList.prototype.canMovePrev = function(){
    return this._list.length > 0 && this._currentProbeIndex > 0
};

ProbeList.prototype.length = function(){
    return this._list.length;
};

ProbeList.prototype.isEveryState = function(state){
    return this._list.every (function (probe){
        return probe.getState() === state;
    });
};

module.exports = ProbeList;