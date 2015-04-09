import Experiment = require ('../models/Experiment');
import Sprite = require ('../models/Sprite');
declare var $;

class ExperimentRepository {
    private static _fakeExperiment = {"_id":"FAKE FAKE","_facilitators":["gil"],"_tags":["test"],"_startTime":"2015-04-08T06:47:08.767Z","_template":{"_id":"et1","_name":"test","_questions":[{"_state":"not started","_onStateChanged":null,"_frame":0,"_frameDuration":16,"_startedAt":0,"_endedAt":0,"_id":"q1","_spriteId":"s2","_introImageUrl":"","_introTexts":""},{"_state":"not started","_onStateChanged":null,"_frame":0,"_frameDuration":16,"_startedAt":0,"_endedAt":0,"_id":"q1","_spriteId":"s4","_introImageUrl":"","_introTexts":""},{"_state":"not started","_onStateChanged":null,"_frame":0,"_frameDuration":16,"_startedAt":0,"_endedAt":0,"_id":"q1","_spriteId":"s7","_introImageUrl":"","_introTexts":""},{"_state":"not started","_onStateChanged":null,"_frame":0,"_frameDuration":16,"_startedAt":0,"_endedAt":0,"_id":"q1","_spriteId":"s8","_introImageUrl":"","_introTexts":""}]}};
    private _sprites = {};

    constructor() {
        this._sprites = {
            "s1": new Sprite("s1", "sprites/15x40/sprite-arab-angry-smile-small.jpg", 7680, 15360, 40, 15, 600),
            "s2": new Sprite("s2", "sprites/15x40/sprite-arab-angry-smile-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            "s3": new Sprite("s3", "sprites/15x40/sprite-arab-smile-angry-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            "s4": new Sprite("s4", "sprites/15x40/sprite-arab-smile-angry-small.jpg", 7680, 15360, 40, 15, 600),
            "s5": new Sprite("s5", "sprites/15x40/sprite-jew-angry-smile-small.jpg", 7680, 15360, 40, 15, 600),
            "s6": new Sprite("s6", "sprites/15x40/sprite-jew-angry-smile-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            "s7": new Sprite("s7", "sprites/15x40/sprite-jew-smile-angry-teeth-small.jpg", 7680, 15360, 40, 15, 600),
            "s8": new Sprite("s8", "sprites/15x40/sprite-jew-smile-angry-small.jpg", 7680, 15360, 40, 15, 600)
        };
    }

    fetch() {
        // fake\
        var sprites = this._sprites;
        return $.when(true).then(function(){
            var experiment = Experiment.fromJS(ExperimentRepository._fakeExperiment);
             // TODO: repositoryy
            experiment.template.questions.forEach(function(question){
                question.sprite = sprites[question.spriteId]; 
            }, this);
            
            return experiment;
        });

        // real
        return $.getJSON( "experiments/")
            .then(function(experiments){
                var first = experiments[0];
                return Experiment.fromJS(first);
            })
            .fail(function(){
                // temp
        debugger;

                return Experiment.fromJS(ExperimentRepository._fakeExperiment);
            });
    }
}

export = ExperimentRepository;