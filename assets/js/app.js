/*Watch ID holder*/
var intervalId;
/*Watch Object*/
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

//Question and Anwsers
var quizArr = quizArrConstructor();
//$$uery to Variables
var $$ = jQueryVar();

// trackers
var quiz;
var awsId = -1;
var nextQuestion = -1;
//================= Logic ===========================

$(window).load(function(){
  if (nextQuestion === -1){
    screenSelector("start");  
  }
  
  $$.$start.on("click", function(){
    nextQuestion++;
    quiz = quizArr[nextQuestion];
    questionBuilder(quiz);
    screenSelector("question");
  });

  //Stores the user Anwser on variable "awsId"
  $$.$awsList.on("click", ".aws-btn", function(){
    awsId = parseInt($(this).attr("id"));
    
    checkAws(quiz,awsId); 
    console.log("question checked " + nextQuestion);
    nextQuestion++;
    quiz = quizArr[nextQuestion];
  }); 


/*
  if (trigger){

    if(checkAws(quiz,awsId)){
      // correto 
      //carrega porxima pergunta
    }else{
      //errado
      //carrega proxima pergunta

    }    
  }else{
    
    setTimeout(function(){

      //nextQuestion

    },10100);
  }*/



});


//================= functions =======================
//------ pass $() elements to variables ------
function jQueryVar(){
  var $aws;
  return{
    /*Start Screen $() elements*/
    $start: $("#start"),
    /*Question Screen $() elements*/ 
    $aws: $(".aws-btn"),
    $timer: $("#timer"),
    $quest: $("#quest"),
    $awsList: $(".aws-list"),
    $aws: $aws,
    /*Score Screen $() elements*/ 
    $restart: $("#restart"),
    /*screens*/
    $startScreen: $(".start"),
    $questionScreen: $(".question"),
    $scoreScreen: $(".score"),
  };
}
//------ populate the quizArr array with objs questions ------
function quizArrConstructor(){
  function questionEntry(question, alternatives, awsIndex){
    return{
      question: question,
      alternatives: alternatives,
      awsIndex: awsIndex
    };
  }

  var result=[];
  // Add question here
  result.push(questionEntry("question 01",["resposta1","resposta2","resposta3"],2)); 
  result.push(questionEntry("question 02",["resposta1","resposta2","resposta3","resposta4"],1)); 
  result.push(questionEntry("question 03",["resposta1","resposta2","resposta3","resposta4"],2)); 
  result.push(questionEntry("question 04",["resposta1","resposta2","resposta3","resposta4"],4)); 
  //--------------------
  return result;
}
//------ Screen Selector ---- parameter: "screen name" --
function screenSelector(screen){
  if(screen === "start"){
    $$.$questionScreen.hide();
    $$.$scoreScreen.hide();
    $$.$startScreen.show();    
  }
  if(screen === "question"){
    $$.$startScreen.hide();
    $$.$scoreScreen.hide();
    $$.$questionScreen.show();
  }
  if(screen === "score"){
    $$.$startScreen.hide();
    $$.$questionScreen.hide();
    $$.$scoreScreen.show();
  }
}
//------ Load Question ---- quizArr[index] -------                          
function questionBuilder(qObj){
  /*display question*/
  $$.$quest.text(qObj.question);
  /*building buttons with alternatives*/
  for (var i = 0; i < qObj.alternatives.length; i++){
    var alternative = qObj.alternatives[i];  
    var $optionBtn = $("<li>");
    $optionBtn.append("<a id="+i+" class='aws-btn btn btn-primary btn-lg primay' role='button' href='#'>");
    $optionBtn.find("#"+i).text(alternative);

    //store the button on the obj
    $$.$aws = $optionBtn;
    //display in the screen
    $$.$awsList.append($$.$aws);
  }
}
//---------------- Check Anwser -------------------
function checkAws(qObj,userAws){
  console.log("checkAws");
  if (userAws === qObj.awsIndex){
    console.log("right");
    
  }else{
    console.log("wrong");
    
  } 
}




























