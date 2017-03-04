/*Watch ID holder*/
var intervalId;
var watch = {

  timesUp: false,
  time: 10,
  totalCalls: 0,

  start: function() {
    watch.timesUp = false;
    intervalId = setInterval(watch.count, 1000);
  },
  stop: function() {
    clearInterval(intervalId);
    watch.timesUp = true;
    watch.time = 10;
    watch.totalCalls++;
  },
  count: function() {
    watch.time--;
    var converted = watch.timeConverter(watch.time);
    if (watch.time === 0){
      watch.stop();
    }
    $$.$timer.text(converted);
  },
  timeConverter: function(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};
/*------------------------------------*/


var quizArr = quizArrConstructor();
var $quiz = $(".quiz");

// trackers
var userAnswer = 0;
var questIndex = 0;
var answer = false;
//================= Logic ===========================

$(window).load(function(){
  
  startBuilder(quizArr[questIndex]);
  
  $($quiz).on("click", ".answer-btn", function(){
    userAnswer = parseInt($(this).attr("id"));
    
    answer = checkanswer(quizArr[questIndex],userAnswer);
    
    questIndex++;

  });

  
});


//================= functions =======================

//------ populate the quizArr array with objs questions ------
function quizArrConstructor(){
  function questionEntry(question, alternatives, answerIndex){
    return{
      question: question,
      alternatives: alternatives,
      answerIndex: answerIndex
    };
  }

  var result=[];
  // Add question here
  result.push(questionEntry("Trivia Quiz!",["Start"],0)); 
  result.push(questionEntry("question 02",["resposta1","resposta2","resposta3","resposta4"],1)); 
  result.push(questionEntry("question 03",["resposta1","resposta2","resposta3","resposta4"],2)); 
  result.push(questionEntry("question 04",["resposta1","resposta2","resposta3","resposta4"],4)); 
  //--------------------
  return result;
}
//---------------- Check answerser -------------------
function checkanswer(qObj,answer){
  
  if (answer === qObj.answerIndex){
    console.log("right");
    return true;
  }else{
    console.log("wrong");
    return false;
  } 
}
//-------------------- Screens -----------------
function startBuilder(qObj){
  var startIndex = qObj.alternatives.indexOf("Start");
  var screen = $("<div class=jumbotron>");
    screen.append("<h1 class='text-center'>"+qObj.question+"</h1>");
    screen.append("<p class='p text-center'>");
    screen.find(".p")
      .append("<a id="+startIndex+" class='answer-btn btn btn-success btn-lg primay' role='button' href='#'>"+qObj.alternatives+"</a>");

    $quiz.append(screen);
}
function questionBuilder(qObj){
  var screen = $("<div class=jumbotron>");
    screen.append("<h3 id='timer'>00:00</h3>");
    screen.append("<div class=' question-box panel panel-default text-center'>");
    screen.find(".question-box").append("<h2><span id='quest'>Questions here ?</span></h2>");
    screen.append("<div class='row answer'>");
    screen.find(".answer").append("<ul class='text-center answer-list'></ul>");
    $quiz.append(screen);  


  /*display question*/
  $("#quest").text(qObj.question);
  for (var i = 0; i < qObj.alternatives.length; i++){
    var alternative = qObj.alternatives[i];  
    var answerBtn = $("<li>");
    answerBtn.append("<a id="+i+" class='answer-btn btn btn-primary btn-lg primay' role='button' href='#'>");
    answerBtn.find("#"+i).text(alternative);

    $(".answer-list").append(answerBtn);
  }
}
function scoreBuilder(){
  var screen = $("<div class=jumbotron>");
    screen.append("<div class=' score-box panel panel-default text-center'>");
    screen.find(".score-box").append("<h2><span id='score'>Score</span></h2>");
    screen.append("<div class='row score'>");
    screen.find(".score").append("<ul class='text-center score-list'></ul>");
    
    screen.find(".score-list")
      .append("<li class='score'><p>Correct Answers: </p><span id='right-score'></li>");
    screen.find(".score-list")
      .append("<li class='score'><p>Incorrect Answers: </p><span id='wrong-score'></li>");
    screen.find(".score-list")
      .append("<li class='score'><p>Unanswered: </p><span id='not-score'></li>");

    $quiz.append(screen);
}
//----------------------------------------------






























