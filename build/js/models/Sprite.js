var Sprite = (function () {
    function Sprite(id, url, width, height, rows, cols, frames) {
        this._id = id;
        this._url = url;
        this._width = width;
        this._height = height;
        this._rows = rows;
        this._cols = cols;
        this._frames = frames;
    }
    Object.defineProperty(Sprite.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "cols", {
        get: function () {
            return this._cols;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "frames", {
        get: function () {
            return this._frames;
        },
        enumerable: true,
        configurable: true
    });
    return Sprite;
})();
module.exports = Sprite;
