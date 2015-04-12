'use strict';

var ProbeResult = (function () {
    function ProbeResult(id) {
        this._id = id;
    }
    Object.defineProperty(ProbeResult.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProbeResult.prototype, "timestamp", {
        get: function () {
            return this._timestamp;
        },
        enumerable: true,
        configurable: true
    });
    return ProbeResult;
})();


module.exports = ProbeResult;