import Experiment = require ('../models/Experiment');
declare var $;

class ExperimentRepository {
    private static _fakeExperiment = {"_id":"FAKE FAKE","_facilitators":["gil"],"_tags":["test"],"_startTime":"2015-04-08T06:47:08.767Z","_template":{"_id":"et1","_name":"test","_questions":[{"_state":"not started","_onStateChanged":null,"_frame":0,"_frameDuration":16,"_startedAt":0,"_endedAt":0,"_id":"q1","_spriteId":"s2","_introImageUrl":"","_introTexts":""},{"_state":"not started","_onStateChanged":null,"_frame":0,"_frameDuration":16,"_startedAt":0,"_endedAt":0,"_id":"q1","_spriteId":"s4","_introImageUrl":"","_introTexts":""},{"_state":"not started","_onStateChanged":null,"_frame":0,"_frameDuration":16,"_startedAt":0,"_endedAt":0,"_id":"q1","_spriteId":"s7","_introImageUrl":"","_introTexts":""},{"_state":"not started","_onStateChanged":null,"_frame":0,"_frameDuration":16,"_startedAt":0,"_endedAt":0,"_id":"q1","_spriteId":"s8","_introImageUrl":"","_introTexts":""}]}};

    fetch() {
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