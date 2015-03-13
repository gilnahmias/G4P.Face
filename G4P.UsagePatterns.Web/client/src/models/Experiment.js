'use strict';

var ProbeList = require ("./ProbeList.js");

var Experiment = function(){
    this._id = new Date().toString();
    this._facilitator = "facilitator";
    this._startTime = new Date(); 
    this._probeList = new ProbeList();
};

Experiment.prototype.probes = function(){
    return _this._probeList;
};

module.exports = Experiment;