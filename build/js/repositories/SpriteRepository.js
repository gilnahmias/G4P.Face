var Sprite = require("../models/Sprite");
var SpriteRepository = (function () {
    function SpriteRepository() {
    }
    SpriteRepository.prototype.get = function (spriteId) {
        var sprites = {
            "sp1": new Sprite("sp1", "sprites/15x40/sprite-arab-angry-smile-small.jpg", 7680, 15360, 40, 15, 600),
            "sp2": new Sprite("sp2", "sprites/15x40/sprite-arab-angry-smile-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            "sp3": new Sprite("sp3", "sprites/15x40/sprite-arab-smile-angry-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            "sp4": new Sprite("sp4", "sprites/15x40/sprite-arab-smile-angry-small.jpg", 7680, 15360, 40, 15, 600),
            "sp5": new Sprite("sp5", "sprites/15x40/sprite-jew-angry-smile-small.jpg", 7680, 15360, 40, 15, 600),
            "sp6": new Sprite("sp6", "sprites/15x40/sprite-jew-angry-smile-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            "sp7": new Sprite("sp7", "sprites/15x40/sprite-jew-smile-angry-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            "sp8": new Sprite("sp8", "sprites/15x40/sprite-jew-smile-angry-small.jpg", 7680, 15360, 40, 15, 600)
        };
        return sprites[spriteId];
    };
    return SpriteRepository;
})();
module.exports = SpriteRepository;
