'use strict';

var Sprite = function(imageUrl, width, height, rows, cols, totalFrames){
    this._imageUrl = imageUrl;
    this._width = width;
    this._height = height;
    this._rows = rows;
    this._cols = cols;
    this._totalFrames = totalFrames || this._rows * this._cols;
};

Sprite.prototype.getImageUrl = function(){
    return this._imageUrl;
};

Sprite.prototype.getWidth = function(){
    return this._width;
};

Sprite.prototype.getHeight = function(){
    return this._height;
};

Sprite.prototype.getRows = function(){
    return this._rows;
};

Sprite.prototype.getCols = function(){
    return this._cols;
};

Sprite.prototype.getTotalFrames = function(){
    return this._totalFrames;
};

module.exports = Sprite;