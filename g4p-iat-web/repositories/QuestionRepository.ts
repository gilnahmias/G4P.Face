import Question = require ('../models/Question');
declare var $;

class QuestionRepository {
    
    save(question:Question) {
        alert ('1111111111');
        $.post( "questions/", question);
    }

    notify(){
        alert ("no teeeee fy");
    }

}

export = QuestionRepository;