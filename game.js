  var buttonColors = ["red", "blue", "green", "yellow"];
  var gamePattern = [];
  var userClickedPattern = [];
  var level = 0;
  var started = false;


  $("body").keypress(function() {
    if (!started) {
      started = true;
      $("#level-title").text("level " + level);
      nextSequence();
    }

  });

  $(".btn").click(function() {
      if (started) {
        var clickedButton = $(this);
        var userChosenColor = clickedButton.attr('id');
        playSound(userChosenColor);
        userClickedPattern.push(userChosenColor);
        console.log(userClickedPattern);
        animatePress(userChosenColor);
        if (userClickedPattern.length === gamePattern.length) {
          checkAnswer();
        }
      }

    }

  );


  function nextSequence() {
    userClickedPattern = [];
    setTimeout(function() {
      if (started) {
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        console.log(gamePattern);
        animatePattern(gamePattern);
        level++;
        $("#level-title").text("level " + level);
      }
    }, 1000)



  }

  function playSound(buttonColorName) {
    soundFile = "sounds/" + buttonColorName + ".mp3"

    var buttonSound = new Audio(soundFile);
    buttonSound.play();
  }

  function animatePress(currentColor) {
    var selectedElement = $("#" + currentColor);
    selectedElement.addClass("pressed");
    setTimeout(function() {
      selectedElement.removeClass("pressed");
    }, 200)
  }

  function animatePattern(patternArray) {
    var patternLength = patternArray.length;
    for (let i = 0; i < patternLength; i++) {
      setTimeout(function() {
        playSound(patternArray[i]);
        animatePress(patternArray[i]);

      }, i * 700);
    }
  }

  function checkAnswer() {
    var rightAnswer = true;

    for (var i = 0; gamePattern.length > i; i++) {
      if (gamePattern.toString() !== userClickedPattern.toString()) {
        var rightAnswer = false
      };
    }
    // return rightAnswer;
    if (rightAnswer) {
      console.log("correct answer")
      nextSequence();
    } else if (!rightAnswer) {
      $("#level-title").text("Game Over!");
      level = 0;

      gamePattern = [];
      setTimeout(function(){
        $("#level-title").text("Press A Key to Start");
        started = false;
      }
      , 2000);

    };



  }
