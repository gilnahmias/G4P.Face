var Browser = (function () {
    function Browser(id, type, version, isMobile, externalIP, internalIP) {
        this._id = id;
        this._type = type;
        this._version = version;
        this._isMobile = isMobile;
        this._externalIP = externalIP;
        this._internalIP = internalIP;
    }
    Object.defineProperty(Browser.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "isMobile", {
        get: function () {
            return this._isMobile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "externalIP", {
        get: function () {
            return this._externalIP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "internalIP", {
        get: function () {
            return this._internalIP;
        },
        enumerable: true,
        configurable: true
    });
    return Browser;
})();
module.exports = Browser;
