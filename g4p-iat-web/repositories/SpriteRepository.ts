import Sprite = require ("../models/Sprite");
declare var $;

class SpriteRepository{
    get(spriteId:string){
        var sprites = [
            new Sprite("sp1", "sprites/15x40/sprite-arab-angry-smile-small.jpg", 7680, 15360, 40, 15, 600),
            new Sprite("sp2", "sprites/15x40/sprite-arab-angry-smile-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            new Sprite("sp3", "sprites/15x40/sprite-arab-smile-angry-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            new Sprite("sp4", "sprites/15x40/sprite-arab-smile-angry-small.jpg", 7680, 15360, 40, 15, 600),
            new Sprite("sp5", "sprites/15x40/sprite-jew-angry-smile-small.jpg", 7680, 15360, 40, 15, 600),
            new Sprite("sp6", "sprites/15x40/sprite-jew-angry-smile-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            new Sprite("sp7", "sprites/15x40/sprite-jew-smile-angry-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            new Sprite("sp8", "sprites/15x40/sprite-jew-smile-angry-small.jpg", 7680, 15360, 40, 15, 600)
        ];

        return $.getJSON("foo").always(function(){
            debugger;
            return sprites[3];
        });
    }
}