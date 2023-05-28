var currentQuestion;
var timeLeft = 10;
var interval;
var currentScore;


var numberGenerator = function (max) {
  return Math.ceil(Math.random() * max);
}

var questionGenerator = function () {
  var set = {};
  var a = numberGenerator(10);
  var b = numberGenerator(10);

  set.question = String(a) + "+" + String(b);
  set.answer = a + b; 

  return set;
}

var nextQuestion = function() {
  currentQuestion = questionGenerator();
  $('#question').text(currentQuestion.question)
}

var checkAnswer = function(userAnswer, answer) {
  if (userAnswer === answer) {
    nextQuestion();
    $('#answer').val('');
    updateTime(1);
  }
}

$('#answer').on('keyup', function () {
  startGame();
  checkAnswer(Number($(this).val()), currentQuestion.answer);
})

nextQuestion();

var updateTime = function (sec) {
  timeLeft += sec;
  $('#timer').text(timeLeft);
}

var startGame = function () {
  if(!interval) {
    if (timeLeft === 0) {
      updateTime(10);
    }

    interval = setInterval (function () {
      updateTime(-1); 
        if (timeLeft === 0) {
        clearInterval(interval);
        interval = undefined; 
      }
    }, 1000)
  }
}