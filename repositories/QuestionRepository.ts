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

    return1(){
        return 1;
    }

}

export = QuestionRepository;