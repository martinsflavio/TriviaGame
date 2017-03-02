function btnLink(){
  this.$start = $("#start");
  /*Question Buttons*/ 
  this.$awsA = $(".aws-a");
  this.$awsB = $(".aws-b");
  this.$awsC = $(".aws-c");
  this.$awsD = $(".aws-d");
  this.$restart = $("#restart");
}



var timer = {
  intID: 0,
  t: 1,
  start: function(){
    timer.intID = setInterval(timer.count,1000);
  },
  stop: function(){
    clearInterval(timer.intID);
    console.log("fim");
  },
  count: function(){
    timer.t++;
    console.log(timer.t);
  }
}