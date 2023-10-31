
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level = 0;
var started= false;


function playSound(name){
  var audio = new Audio( "sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentcolor){
  $("#" + currentcolor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentcolor).removeClass("pressed");
  },100);
}

function checkAnswers(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("wrong");
    $("#level-title").text("Game Over!! Press any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber= Math.floor(Math.random() * 4) ;
  var randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  }


$(".btn").click(function(event){
  var userChosenColour= $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswers(userClickedPattern.length-1);
})

$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;
}
})
