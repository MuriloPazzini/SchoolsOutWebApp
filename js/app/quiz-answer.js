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
        if (window.matchMedia("(min-width: 760px)").matches) {
            setTimeout(function () {
                $('#quiz-answer-body').hide();
                $('#congrats-text').text('You scored: ' + result + ' out of ' + quiz.questions.length)
                $('#ballons_congrats').css('display', 'block');
            }, 2500);
        } else {
            setTimeout(function () {
                $('#quiz-answer-body').hide();
                $('.mobile-congrats-text').text('You scored: ' + result + ' out of ' + quiz.questions.length)


                window.addEventListener(
                    "resize",
                    function () {
                        W = window.innerWidth;
                        H = window.innerHeight;
                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;
                    },
                    false
                );

                // Push new confetti objects to `particles[]`
                for (var i = 0; i < maxConfettis; i++) {
                    particles.push(new confettiParticle());
                }

                // Initialize
                $('.mobile-congrats').css('display', 'block');
                canvas.width = W;
                canvas.height = H;
                Draw();
            }, 2500);

        }
    }
}

//events
$(document).ready(function () {
    initQuizAnswer();
});

//animation
let W = window.innerWidth;
let H = window.innerHeight;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxConfettis = 60;
const particles = [];

const possibleColors = [
    "DodgerBlue",
    "OliveDrab",
    "Gold",
    "Pink",
    "SlateBlue",
    "LightBlue",
    "Gold",
    "Violet",
    "PaleGreen",
    "SteelBlue",
    "SandyBrown",
    "Chocolate",
    "Crimson"
];

function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
    this.x = Math.random() * W; // x
    this.y = Math.random() * H - H; // y
    this.r = randomFromTo(11, 33); // radius
    this.d = Math.random() * maxConfettis + 11;
    this.color =
        possibleColors[Math.floor(Math.random() * possibleColors.length)];
    this.tilt = Math.floor(Math.random() * 33) - 11;
    this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
    this.tiltAngle = 0;

    this.draw = function () {
        context.beginPath();
        context.lineWidth = this.r / 2;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.tilt + this.r / 3, this.y);
        context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
        return context.stroke();
    };
}

function Draw() {
    const results = [];

    // Magical recursive functional love
    requestAnimationFrame(Draw);

    context.clearRect(0, 0, W, window.innerHeight);

    for (var i = 0; i < maxConfettis; i++) {
        results.push(particles[i].draw());
    }

    let particle = {};
    let remainingFlakes = 0;
    for (var i = 0; i < maxConfettis; i++) {
        particle = particles[i];

        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

        if (particle.y <= H) remainingFlakes++;

        // If a confetti has fluttered out of view,
        // bring it back to above the viewport and let if re-fall.
        if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
            particle.x = Math.random() * W;
            particle.y = -30;
            particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
    }

    return results;
}

