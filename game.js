var buttonColours = ["pink", "red", "blue", "green","purple", "yellow"];
var funFacts = [
  "At just 10 years old, Nischal Narayanam claimed his first Guinness World Record—for most random objects memorized.",
  "The human brain starts to remember things from the womb.",
  "Short-term memory only lasts 20 to 30 seconds.",
  "The human brain's storage capacity is virtually limitless.",
  "A good night's rest helps us better store memories.",
  "We don't remember sounds that well.",
  "There's a peak age for facial recognition.",
  "Depression impacts our ability to remember things.",
  "Some lies are easier to remember than others."
]
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Mimic it!  Level " + level);
    $("#instruction").text("Remember the sequence of the steps and mimic it.");
    $("#fun-fact").text("Fun fact: "+ funFacts[Math.floor(Math.random() * 9)]);
    nextSequence();
    started = true;
  }
});

//Using jQuery to detect when any of the buttons are clicked and
//trigger a handler function.
$(".btn").click(function() {

  //to store the id of the button that got clicked.
  // keyword this to refer to the button object that triggered the click.
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
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

      $("#level-title").text("Game Over! You reached Level " + level+ ". Press any keyboard key to Restart.");
      $("#instruction").text(" Most short-term memories are, well, short-term.");
      $("#fun-fact").text("Fun fact: "+ funFacts[Math.floor(Math.random() * 9)]);

      //Call startOver() if the user gets the sequence wrong.
      startOver();
    }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Mimic it!  Level " + level);

  var randomNumber = Math.floor(Math.random() * 6);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  //reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
