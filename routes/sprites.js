var express = require('express');
var router = express.Router();
var Sprite = require('../build/js/models/Sprite.js');

var allSprites ={
    "s1": new Sprite("s1", "sprites/15x40/sprite-arab-angry-smile-small.jpg", 7680, 15360, 40, 15, 600),
    "s2": new Sprite("s2", "sprites/15x40/sprite-arab-angry-smile-teeth-small.jpg", 7680, 15360, 40, 15, 600),
    "s3": new Sprite("s3", "sprites/15x40/sprite-arab-smile-angry-teeth-small.jpg", 7680, 15360, 40, 15, 600),
    "s4": new Sprite("s4", "sprites/15x40/sprite-arab-smile-angry-small.jpg", 7680, 15360, 40, 15, 600),
    "s5": new Sprite("s5", "sprites/15x40/sprite-jew-angry-smile-small.jpg", 7680, 15360, 40, 15, 600),
    "s6": new Sprite("s6", "sprites/15x40/sprite-jew-angry-smile-teeth-small.jpg", 7680, 15360, 40, 15, 600),
    "s7": new Sprite("s7", "sprites/15x40/sprite-jew-smile-angry-teeth-small.jpg", 7680, 15360, 40, 15, 600),
    "s8": new Sprite("s8", "sprites/15x40/sprite-jew-smile-angry-small.jpg", 7680, 15360, 40, 15, 600)
};

/* GET sprite listing. */
router.get('/', function (req, res) {
    var sprites = Object.keys(allSprites).map(function(id){
        return allSprites[id];
    })
    res.send(sprites);
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    res.send(allSprites[id]);
});

module.exports = router;