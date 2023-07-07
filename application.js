var currentQuestion;
var timeLeft = 10;
var interval;
var score = 0;
var highScore = 0;


var numberGenerator = function (max) {
  return Math.ceil(Math.random() * max);
}

var operatorGenerator = function () {
  var arr = [];
  $('.operator:checkbox:checked').each(function () {
    arr.push($(this).val());
  });

  var i = Math.floor(Math.random()*arr.length);
  return arr[i];
}

var questionGenerator = function () {
  var max = $('#range-input').val();
  var set = {};
  var a = numberGenerator(max);
  var b = numberGenerator(max);
  var operator = operatorGenerator();

  switch(operator) {
    case 'plus':
      set.question = set.question = String(a) + '+' + String(b);
      set.answer = a + b;
      break;
    case 'times':
      set.question = set.question = String(a) + 'x' + String(b);
      set.answer = a * b;
      break;
    case 'minus':
      if (b >= a){
        b = numberGenerator(a-1);
      }
      set.question = set.question = String(a) + '-' + String(b);
      set.answer = a - b;
      break;
    case 'divide':
      if (a % b == 0) {
          set.question = set.question = String(a) + '/' + String(b);
          set.answer = a / b;        
        }else if (b % a == 0) {
          set.question = set.question = String(b) + '/' + String(a);
          set.answer = b / a;
        }else{
          var factors = [];
          for (var i = 1; i <= a; i++){
            if (a % i == 0){
              factors.push(i);
            }
          }
          var i = Math.floor(Math.random()*factors.length);
          b = factors[i];
          set.question = set.question = String(a) + '/' + String(b);
          set.answer = a / b;
        }      
        break;
  }
  
  console.log(set);
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
    updateScore(+1)
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
    interval = setInterval (function () {
      updateTime(-1); 
        if (timeLeft === 0) {
        clearInterval(interval);
        interval = undefined;
        updateTime(10);
        updateHighscore();
        updateScore(-score); 
        
      }
    }, 1000)    
  }
}

var updateScore = function(amount){
  score += amount;
  $('#score').text(score)
}

var updateHighscore = function() {
  if(score > highScore) {
    highScore = score;
    $('#highscore').text(highScore)
  }
}

$('#range-input').on('change', function () {
  $('#range-display').text($(this).val());
});

