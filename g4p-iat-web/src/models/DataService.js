'use strict';

var Environment = require("./Environment.js");
var $ = require("jquery");

var DataService = (function (experimentId) {
    function DataService() {
        this._userId = "mememe";
    }

    DataService.prototype.saveProbeResult = function (probeResult){
        if (Environment.Current.isDev){
            console.log (probeResult); 
        }
        else {

            experimentId = "dddddd";

            var serverProbeResult = {
                "id": "idddd",
                "timestamp": 0,
                "spriteId": "spriteId",
                "subjectId": "subjectId",
                "machineTelemetryId": "machineTelemetryId",
                "duration": 0,
                "frame": 0
            };

            var url = 'data/experiments/' + experimentId + "/results";
            $.ajax({
              url: url,
              type: 'POST',
              data: serverProbeResult,
              dataType: 'json',
              contentType: "application/json; charset=utf-8"
            });

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