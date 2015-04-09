'use strict';

var Environment = (function () {
    function Environment() {
        this.isTest = false;
        this.isHeadless = false;
        this.isDev = false;
        if (typeof (mocha) !== "undefined") {
            this.isTest = true;
            /* tslint:disable:no-string-literal */
            if (typeof (window["mochaPhantomJS"]) !== "undefined") {
                this.isHeadless = true;
            }
        }
        if (window.location && window.location.port === "3000") {
            this.isDev = true;
        }
    }
    Object.defineProperty(Environment, "Current", {
        get: function () {
            return Environment._current;
        },
        enumerable: true,
        configurable: true
    });
    Environment._current = new Environment();
    return Environment;
})();

module.exports = Environment;