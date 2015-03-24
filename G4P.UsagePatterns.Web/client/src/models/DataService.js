'use strict';

var Environment = require("./Environment.js");
var reqwest = require("reqwest");

var DataService = (function () {
    function DataService() {
    }

    DataService.prototype.saveExperiment = function (experiment){
        if (Environment.Current.isDev){
            console.log (experiment); 
        }
        else {
            reqwest({
                url: 'data/experiments/' + experiment.getId() + "/results"
              , method: 'post'
              , data: null
            })
            .fail(function(err, msg){
                console.log (err, msg);
            })
        }
    };

    Object.defineProperty(DataService, "Current", {
        get: function () {
            return DataService._current;
        },
        enumerable: true,
        configurable: true
    });
    DataService._current = new DataService();
    return DataService;
})();

module.exports = DataService;