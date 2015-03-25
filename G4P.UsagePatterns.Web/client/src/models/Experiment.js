'use strict';

var ProbeList = require ("./ProbeList.js");

var Experiment = function(userId){
    this._id = new Date().toString();
    this._facilitator = "facilitator";
    this._startTime = new Date(); 
    this._probeList = new ProbeList();
    
    this.userId = userId;

    //this._probeList._onDone = this.save.bind(this);
};

Experiment.prototype.probes = function(){
    return this._probeList;
};

module.exports = Experiment;