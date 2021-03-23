let buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let level = 0

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4) 
  let randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100) //Animasi Flashhhhhhhh Wusshhhhhhh
  playSound(randomChosenColour)
  userClickedPattern = []
  $("h1").text("level " + level)
  level++
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3")
  audio.play()
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed")
  setTimeout(function(){
    $(".pressed").removeClass("pressed")
  }, 100)
}

function checkAnswer(currentLevel){
  if (currentLevel < gamePattern.length - 1) {
    if(gamePattern[currentLevel] != userClickedPattern[currentLevel]) {
      $("body").addClass("game-over")
      playSound("wrong")
      startOver()
      $("h1").text("Game Over, Press Any Key to Restart")
      setTimeout(() => {
        $("body").removeClass("game-over")
      }, 200);
    }
  } else {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      setTimeout(() => {
        nextSequence()
      }, 1000);
    }else {
      $("body").addClass("game-over")
      let audio = new Audio("sounds/wrong.mp3")
      playSound("wrong")
      startOver()
      $("h1").text("Game Over, Press Any Key to Restart")
      setTimeout(() => {
        $("body").removeClass("game-over")
      }, 200);
    } 
  }
}

function startOver() {
  gamePattern = []
  userClickedPattern = []
  level = 0
}

$(".btn").click(function(){
  let userChosenColour = $(this).attr("id")
  userClickedPattern.push(userChosenColour)
  playSound(userChosenColour)
  animatePress(userChosenColour)
  checkAnswer(userClickedPattern.length - 1)
})

$(document).keypress(function() {
  if(level == 0) {
    level++
    nextSequence()
  }
  
})
