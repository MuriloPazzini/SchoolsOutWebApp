let quiz = {};
let result = 0;

function initQuizAnswer() {
    $('#quiz-loading-section').show();
    $('#quiz-answer-body').hide();

    let id = urlParam('quiz_id');

    var settings = {
        "url": baseUrl + "/api/quiz/getById/" + id,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {

        quiz = response;
        buildQuiz(0);

        $('#quiz-loading-section').hide();
        $('#quiz-answer-body').show();

    });
}

function buildQuiz(index) {
    if (index != 0) {
        $('#quiz-answer-collection').remove();
    }
    $('#quiz-title').text(quiz.name);
    $('#quiz-body').text(quiz.questions[index].description);
    $('#quiz-answer').append('<div class="collection" id="quiz-answer-collection"></div>');

    for (var i = 0; i < quiz.questions[index].answers.length; i++) {
        $('#quiz-answer-collection').append('<a id="answer_' + i + '" href="javascript:;" onclick="checkAnswer(' + index + ', ' + i + ');" class="collection-item">' + quiz.questions[index].answers[i].description + '</a>');
    }
}

function checkAnswer(questionIndex, answerIndex) {
    if (quiz.questions[questionIndex].answers[answerIndex].correct) {
        result = result + 1;
        $('#answer_' + answerIndex).css('background-color', '#4db6ac');
    } else {
        $('#answer_' + answerIndex).css('background-color', '#ef5350');
    }

    if (quiz.questions.length > (questionIndex + 1)) {
        setTimeout(function () {
            buildQuiz(questionIndex + 1);
        }, 2500);
    } else {
        setTimeout(function () {
            $('#quiz-answer-body').hide();
            $('#congrats-text').text('You scored: ' + result + ' out of ' + quiz.questions.length)
            $('#ballons_congrats').css('display', 'block');
        }, 2500);
    }
}

//events
$(document).ready(function () {
    initQuizAnswer();
});