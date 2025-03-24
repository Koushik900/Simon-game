var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedColors = [];
var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedColors = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomChooseColors = buttonColours[randomNumber];
  gamePattern.push(randomChooseColors);

  $("#" + randomChooseColors)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChooseColors);
}

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedColors.push(userChosenColor);
  playSound(userChosenColor);
  animateColor(userChosenColor);
  checkAnswer(userClickedColors.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animateColor(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedColors[currentLevel]) {
    console.log("success");
    if (userClickedColors.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}
