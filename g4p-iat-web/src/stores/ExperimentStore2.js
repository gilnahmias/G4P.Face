'use strict';

var biff = require ('../dispatcher/biff');
var Sprite = require ('../../build/js/models/Sprite');
var Question = require ('../../build/js/models/Question');
var Answer = require ('../../build/js/models/Answer');
var Experiment = require ('../../build/js/models/Experiment');

var _experiment = new Experiment();

var ExperimentStore2 = biff.createStore({

}, function(payload){
    switch(payload.actionType){
        
    }

    return true;
});

module.exports = ExperimentStore2;