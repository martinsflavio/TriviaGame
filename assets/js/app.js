var quizArr = quizArrConstructor();
var $quiz = $(".quiz");

// trackers
var userAnswer = 0;
var questIndex = 0;
var answer = "";
var right = 0; 
var wrong = 0;
var not = 0;

//========== watch =========
var intervalId;
var watch = {
  time: 10,

  start: function() {
    intervalId = setInterval(watch.count, 1000);
  },
  stop: function() {
    clearInterval(intervalId);
    watch.time = 10;
  },
  count: function() {
    watch.time--;
    var converted = watch.timeConverter(watch.time);
    $("#timer").text(converted);
    //=======================
    if (watch.time === 0){
      watch.stop();
      not++;
      if(questIndex === quizArr.length - 1){
        $($quiz).empty();
        scoreBuilder(right, wrong, not);
      }else{  
        console.log(not);
        watch.stop();
        $($quiz).empty();
        questIndex++;
        questionBuilder(quizArr[questIndex]);
      }
    }
    //=======================
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
//==========================
//================= Logic ===========================

$(window).load(function(){
  
  startBuilder(quizArr[questIndex]);

  $($quiz).on("click", "#start", function(){
    $($quiz).empty();
    questionBuilder(quizArr[0]);
  });

  $($quiz).on("click", ".answer-btn", function(){
    
    userAnswer = parseInt($(this).attr("id"));
    answer = checkanswer(quizArr[questIndex],userAnswer);

    if (answer === "right"){
      right++;
    }
    if (answer === "wrong"){
      wrong++;
    }
    printAnswer(answer, questIndex);
    setTimeout(function(){ 
      $quiz.empty();
      // print score
      if(questIndex === quizArr.length - 1){
        $($quiz).empty();
        scoreBuilder(right, wrong, not);
      }else{
        $($quiz).empty();
        questIndex++;
        questionBuilder(quizArr[questIndex]);
      }  
    },1000);
  });

  $($quiz).on("click", "#restart", function(){
    $($quiz).empty();
    
    userAnswer = 0;
    questIndex = 0;
    answer = "";
    right = 0; 
    wrong = 0;
    not = 0;
    startBuilder();
  });

});


//================= functions =======================

//---------------------------------------------------
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
  result.push(questionEntry("What is the biggest city in the world?",["Tokyo - Japan","Jakarta - Indonesia","Delhi - India"],0)); 
  result.push(questionEntry("The Next 4 digitis of Phi 3.141...",["...5927...","...6534...","...5926...","...7834..."],2)); 
  result.push(questionEntry("How many planets are in the solar system?",["9","8"],1));
  result.push(questionEntry("The most populated country in the world?",["Russia","India","China"],2)); 
  result.push(questionEntry("How old is the universe?",["11.772 billion years","14.772 billion years","12.772 billion years","13.772 billion years"],3));  
  //--------------------
  return result;
}
//---------------------------------------------------
function checkanswer(qObj,answer){
  
  if (answer === qObj.answerIndex){
    console.log("right");
    return "right";
  }
  if (answer !== qObj.answerIndex){
    console.log("wrong");
    return "wrong";
  }   
}
//---------------------------------------------------
function printAnswer(value,qIndex){
  var $ans = $(".answer");
  var result = $("<div class='text-center'>");
  var image = ""; 
  var message = "";
  
  if (value === "wrong"){
    image = "w";
    message = "Sorry Wrong Answer!";
  }
  if(value === "right"){
    image = "r";
    message = "Congratulations Right Answer!";
  }
 
  result.append("<img src='./assets/images/"+image+".png'>");
  result.append("<h3>"+message+"</h3>");
  $ans.empty();
  $(".answer").append(result);



  watch.stop();
}


//-------------------- Screens ----------------------
function startBuilder(){
  var screen = $("<div class=jumbotron>");
    screen.append("<h1 class='text-center'>Trivia Quiz!</h1>");
    screen.append("<p class='p text-center'>");
    screen.find(".p")
      .append("<a id='start' class='btn btn-success btn-lg primay' role='button' href='#'>Start</a>");

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
  //===========================
          watch.start();
  //===========================
}
function scoreBuilder(r,w,m){
  var screen = $("<div class=jumbotron>");
    screen.append("<div class=' score-box panel panel-default text-center'>");
    screen.find(".score-box").append("<h2><span id='score'>Score</span></h2>");
    screen.append("<div class='row score'>");
    screen.find(".score").append("<ul class='text-center score-list'></ul>");
    
    screen.find(".score-list")
      .append("<li class='score'><p>Correct Answers: </p><span id='right-score'>"+r+"</li>");
    screen.find(".score-list")
      .append("<li class='score'><p>Incorrect Answers: </p><span id='wrong-score'>"+w+"</li>");
    screen.find(".score-list")
      .append("<li class='score'><p>Unanswered: </p><span id='not-score'>"+m+"</li>");

    screen.find(".score-list")
    .append("<a id='restart' class='btn btn-success btn-lg danger' role='button' href='#'>Restart</a>");

    $quiz.append(screen);
}
//---------------------------------------------------






























