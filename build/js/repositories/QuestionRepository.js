var QuestionRepository = (function () {
    function QuestionRepository() {
    }
    QuestionRepository.prototype.save = function (question) {
        alert('1111111111');
        $.post("questions/", question);
    };
    QuestionRepository.prototype.notify = function () {
        alert("no teeeee fy");
    };
    QuestionRepository.prototype.return1 = function () {
        return 1;
    };
    return QuestionRepository;
})();
module.exports = QuestionRepository;
